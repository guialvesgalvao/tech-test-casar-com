import { formatUpdateDateToString } from "../formatUpdateDateToString";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

describe("formatUpdateDateToString", () => {
  const fixedNow = new Date("2023-03-10T00:00:00Z");

  beforeAll(() => {
    jest.useFakeTimers({ legacyFakeTimers: false });
    jest.setSystemTime(fixedNow);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('deve retornar "Updated a few seconds ago" se a diferença for menor que 60 segundos', () => {
    const date30SecondsAgo = new Date(fixedNow.getTime() - 30 * 1000);

    const result = formatUpdateDateToString(date30SecondsAgo);

    expect(result).toBe("Updated a few seconds ago");
  });

  it('deve retornar "Updated X minute(s) ago" se a diferença for menor que 3600 segundos', () => {
    const date5MinutesAgo = new Date(fixedNow.getTime() - 5 * 60 * 1000);

    const result = formatUpdateDateToString(date5MinutesAgo);

    expect(result).toBe("Updated 5 minutes ago");
  });

  it('deve retornar "Updated 1 minute ago" para exatamente 1 minuto atrás', () => {
    const date1MinuteAgo = new Date(fixedNow.getTime() - 60 * 1000);

    const result = formatUpdateDateToString(date1MinuteAgo);

    expect(result).toBe("Updated 1 minute ago");
  });

  it("deve retornar a data formatada quando a diferença for maior ou igual a 3600 segundos", () => {
    const pastDate = new Date("2023-03-05T00:00:00Z");
    const formattedDate = format(pastDate, "d MMM yyyy", { locale: enUS });
    const expected = `Updated on ${formattedDate}`;
    const result = formatUpdateDateToString(pastDate);
    expect(result).toBe(expected);
  });
});
