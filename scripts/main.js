import { system, world } from "@minecraft/server";

const overworld = world.getDimension("overworld");

const scales = [
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
]

world.beforeEvents.itemUseOn.subscribe(e => {
    const { source, itemStack, block } = e;
    if (source.isSneaking) {
        e.cancel = true;
    }
    if (itemStack.typeId == "note:note_stick" && block.typeId == "minecraft:noteblock") {
        const blocklocation = block.location;
        system.run(() => {
            overworld.runCommandAsync(`structure load __noteblocks ${blocklocation.x} 319 ${blocklocation.z}`);
            system.run(() => {
                const chestInv = overworld.getBlock({ x: blocklocation.x, y: 319, z: blocklocation.z }).getComponent("minecraft:inventory").container;
                chestInv.addItem(block.getItemStack(1, true));
                for (let i = 0; i < chestInv.size; i++) {
                    const item = chestInv.getSlot(i);
                    if (1 < item.amount) {
                        source.onScreenDisplay.setActionBar(`scale: ${scales[i]} click: ${i}`);
                        break;
                    }
                }
                overworld.runCommandAsync(`setblock ${blocklocation.x} 319 ${blocklocation.z} air`);
            })
        })
    }
})