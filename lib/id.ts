import Sqids from "sqids";

const sqids = new Sqids({
  alphabet: "abcdefghijklmnopqrstuvwxyz",
});

export const encodeId = (id: number) => {
  return sqids.encode([id]);
};

export const decodeId = (id: string) => {
  return sqids.decode(id)[0];
};
