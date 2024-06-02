export const fetcher = async <T>(
    ...args: Parameters<typeof fetch>
  ): Promise<T> => {
    const response = await fetch(...args);
    const data = await response.json();
    return data;
  };