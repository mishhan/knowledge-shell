export class UndefinedFrameError extends Error {
  constructor(message?: string) {
    super(message);
  }
};

export class UndefinedFrameSlotError extends Error {
  public frameName!: string;
  public slotName!: string;

  constructor(frameName: string, slotName: string, message?: string) {
    super(message);
    this.frameName = frameName;
    this.slotName = slotName;
  }
};