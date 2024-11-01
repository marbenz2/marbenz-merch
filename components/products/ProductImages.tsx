/* const uploadProductImage = async (
  productId: string,
  imageFile: File,
  isPrimary: boolean = false,
  displayOrder: number,
  supabase: SupabaseClient
) => {
  try {
    // 1. Generiere den Dateipfad im Bucket
    const fileName = isPrimary ? "primary.jpg" : `${displayOrder}.jpg`;
    const filePath = `${productId}/${fileName}`;

    // 2. Lade das Bild in den Bucket hoch
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, imageFile, {
        upsert: true, // überschreibt existierende Datei
      });

    if (uploadError) throw uploadError;

    // 3. Generiere die öffentliche URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("product-images").getPublicUrl(filePath);

    // 4. Speichere den Eintrag in der product_images Tabelle
    const { data: imageData, error: dbError } = await supabase
      .from("product_images")
      .insert({
        product_id: productId,
        image_url: publicUrl,
        is_primary: isPrimary,
        display_order: displayOrder,
      });

    if (dbError) throw dbError;

    return { publicUrl, imageData };
  } catch (error) {
    console.error("Fehler beim Bildupload:", error);
    throw error;
  }
};

const deleteProductImage = async (
  productId: string,
  imageId: string,
  supabase: SupabaseClient
) => {
  try {
    // 1. Hole den Bildeintrag aus der Datenbank
    const { data: imageData, error: fetchError } = await supabase
      .from("product_images")
      .select("image_url")
      .eq("id", imageId)
      .single();

    if (fetchError) throw fetchError;

    // 2. Extrahiere den Dateipfad aus der URL
    const urlParts = imageData.image_url.split("/");
    const filePath = `${productId}/${urlParts[urlParts.length - 1]}`;

    // 3. Lösche die Datei aus dem Bucket
    const { error: storageError } = await supabase.storage
      .from("product-images")
      .remove([filePath]);

    if (storageError) throw storageError;

    // 4. Lösche den Datenbankeintrag
    const { error: dbError } = await supabase
      .from("product_images")
      .delete()
      .eq("id", imageId);

    if (dbError) throw dbError;

    return true;
  } catch (error) {
    console.error("Fehler beim Löschen des Bildes:", error);
    throw error;
  }
};

const getProductImages = async (
  productId: string,
  supabase: SupabaseClient
) => {
  const { data, error } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", productId)
    .order("display_order");

  if (error) throw error;
  return data;
}; */
