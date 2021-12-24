import {parseCurrency} from "../currency";

describe("currency", () => {
  describe("parseCurrency", () => {
    it("Deberia devolver el precio localizado", () => {
      const actual = 138;
      const expected = "$\xa0138,00";

      expect(parseCurrency(actual)).toEqual(expected);
    });
  });
});
