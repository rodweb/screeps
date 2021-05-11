interface RoomVisual {
  structure(
    x: number,
    y: number,
    type: StructureConstant,
    opts?: Partial<{ opacity: number }>,
  ): void;
  connectRoads(opts?: Partial<{ color: string; opacity: number }>): void;
  speech(
    x: number,
    y: number,
    opts?: Partial<{
      background: string;
      opacity: number;
      textcolor: string;
      textsize: string;
      textfont: string;
    }>,
  ): void;
  animatedPosition(
    x: number,
    y: number,
    opts?: Partial<{
      color: string;
      opacity: number;
      radius: number;
      frames: number;
    }>,
  ): void;
  test(): void;
  resource(type: StructureConstant, x: number, y: number, size?: number): void;
}
