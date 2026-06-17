import {
  Block,
  BlockComponentTypes,
  BlockVolume,
  ItemStack,
  StructureSaveMode,
  system,
  world,
} from "@minecraft/server";
import { Instruments } from "./Constants";
import { InstrumentsType } from "../@types";

export default class NoteBlock {
  private static counter = 0;

  static getScale(block: Block): number {
    const tempId = `ntp:tempblock_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    let result = -1;
    if (block.typeId !== "minecraft:noteblock")
      throw new Error("音ブロックではないブロックです。");

    const topLoc = {
      x: block.location.x,
      y: block.dimension.heightRange.max - 1,
      z: block.location.z,
    };

    try {
      const tempBlock = block.dimension.getBlock(topLoc) as Block;
      if (!tempBlock) throw new Error("ブロックが見つかりません。");

      world.structureManager.createFromWorld(
        tempId,
        block.dimension,
        topLoc,
        topLoc,
        { saveMode: StructureSaveMode.Memory },
      );

      world.structureManager.place(
        "__noteblocks",
        block.dimension,
        tempBlock.location,
      );

      const container = tempBlock.getComponent(
        BlockComponentTypes.Inventory,
      )?.container;
      if (!container) throw new Error("コンテナにアクセスできませんでした。");

      container.addItem(block.getItemStack(1, true) as ItemStack);
      for (let i = 0; i < container.size; i++) {
        const slot = container.getSlot(i);
        if (!slot.hasItem()) continue;
        if (slot.amount > 1) {
          result = i;
          break;
        }
      }

      world.structureManager.place(tempId, block.dimension, topLoc);
    } finally {
      try {
        world.structureManager.delete(tempId);
      } catch {}
    }
    return result;
  }

  static getInstrument(block: Block): InstrumentsType {
    const underblock = block.below(1);
    if (!underblock) return "piano";
    const keys = Object.keys(
      Instruments,
    ) as unknown as (keyof typeof Instruments)[];
    for (const key of keys) {
      if (underblock.typeId.includes(key)) {
        return Instruments[key];
      }
    }
    return "piano";
  }
}
