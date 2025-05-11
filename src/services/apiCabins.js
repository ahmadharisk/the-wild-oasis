import supabase, {supabaseUrl} from "@/services/supabase.js";
import {getFileNameFromURL} from "@/utils/helpers.js";

export async function getCabins() {
  const {data: cabins, error} = await supabase
    .from('cabins')
    .select('*')


  if (error) {
    console.log(error)
    throw new Error("Cabins could not be loaded")
  }

  return cabins;
}

export async function deleteCabin(id) {
  const {error} = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

  if (error) {
    console.log(error)
    if (error.code === "23503") throw new Error("Cabin is being booked")
    throw new Error("Cabin could not be deleted")
  }
}

export async function createEditCabin(newCabin, id, existingImage) {
  const hasImagePath = typeof newCabin.image === "string"
  const imageName = hasImagePath ? "" : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "-")
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // initialize query for create and edit
  let query = supabase.from("cabins")

  // query for create
  if (!id) query = query.insert([{...newCabin, image: imagePath}])

  // query for update
  if (id) query = query.update({...newCabin, image: imagePath})
    .eq("id", id)

  const {data, error} = await query.select();

  if (error) {
    console.log(error)
    throw new Error("Cabin could not be created")
  }

  if (id && !hasImagePath) {
    await supabase
      .storage
      .from("cabin-images")
      .remove(getFileNameFromURL(existingImage))
  }

  if (!hasImagePath) {
    const {error: storageError} = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image)

    if (storageError) {
      console.log(storageError)
      await supabase
        .from('cabins')
        .delete()
        .eq('id', data[0].id)
      throw new Error("Image could not be uploaded and the cabin was not created")
    }
  }

  return data;
}