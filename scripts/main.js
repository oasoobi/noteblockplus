import { Vector, system, world } from "@minecraft/server";

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

world.beforeEvents.itemUseOn.subscribe(ev => {
    const { source, itemStack, block } = ev;

    if (itemStack.typeId == "note:note_stick" && block.typeId == "minecraft:noteblock") {
        ev.cancel = true;
        const blocklocation = block.location;
        system.run(() => {
            overworld.runCommandAsync(`structure load __noteblocks ${blocklocation.x} 319 ${blocklocation.z}`);

            system.run(() => {
                try {
                    itemStack.getComponent("cooldown").startCooldown(source);
                    const chestInv = overworld.getBlock(new Vector(blocklocation.x, 319, blocklocation.z)).getComponent("minecraft:inventory").container;
                    chestInv.addItem(block.getItemStack(1, true));
                    for (let i = 0; i < chestInv.size; i++) {
                        const item = chestInv.getSlot(i);
                        if (1 < item.amount) {
                            source.onScreenDisplay.setActionBar(`音階: ${scales[i]} クリック: ${i}`);
                            break;
                        }
                    }
                } catch(err) {
                    console.warn(err);
                }
                overworld.runCommandAsync(`setblock ${blocklocation.x} 319 ${blocklocation.z} air`);
            })
        })
    }
})