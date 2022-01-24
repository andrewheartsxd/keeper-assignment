export const getData = async (url: string) => {
  try {
    const response = await fetch(url);
    return response.ok
      ? { data: (await response.json()) as unknown }
      : { error: `getData error: ${response.status} ${response.statusText}` };
  } catch (error: unknown) {
    // network error
    return { error: (error as Error).message };
  }
};
