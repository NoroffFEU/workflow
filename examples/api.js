/**
 * 
 * @param {number} id The ID number of the item to retrieve
 * @returns {Promise<object | null>} A promise that resolves to the item object or null
 */
export async function getItem(id) {
  try {
    if (!id) {
      throw new Error("No ID provided!");
    }

    id = Number(id)

    if (isNaN(id)) {
      throw new Error("ID is not a number!");
    }

    const response = await fetch(`https://fake-api.com/items/${id}`);

    if (response.ok) {
      return await response.json()
    }

    throw new Error(`Response not OK! Status: ${response.status} ${response.statusText}`)
  } catch (error) {
    console.warn(error);
    return undefined;
  }
}