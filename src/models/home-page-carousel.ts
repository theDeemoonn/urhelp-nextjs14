import mongoose, { Schema, models, Model } from "mongoose";

export interface ICarouselItem {
  title: string;
  link: string;
}

const carouselItemsSchema = new Schema<ICarouselItem>({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

// const predefinedData = [
//     {
//         title: "Суд",
//         link: "/sud",
//     },
//     {
//         title: "Нотариус",
//         link: "/notarius",
//     },
//     {
//         title: "Составление документов",
//         link: "/sostavlenie-dokumentov",
//     },
//     {
//         title: "Риелтор",
//         link: "/rieltor",
//     },
//     {
//         title: "Полиция",
//         link: "/police",
//     }
// ];

let orderItems: Model<ICarouselItem>;
if (models.orderItems) {
  orderItems = mongoose.model<ICarouselItem>("orderItems");
} else {
  orderItems = mongoose.model<ICarouselItem>("orderItems", carouselItemsSchema);
  insertPredefinedData();
}
async function insertPredefinedData() {
  const count = await orderItems.countDocuments();
  if (count === 0) {
    orderItems
      .insertMany(predefinedData)
      .then(() => console.log("Data inserted successfully!"))
      .catch((err) => console.error("Insertion error:", err));
  } else {
    console.log("Predefined data already exists.");
  }
}

if (!models.orderItems) {
  insertPredefinedData(); // Вызов функции для вставки данных после создания модели
}

export default orderItems;
