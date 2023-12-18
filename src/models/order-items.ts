import mongoose, { Schema, models, Model } from "mongoose";

export interface IOrderItem {
  title: string;
  logo?: string;
  description?: string;
}

const orderItemsSchema = new Schema<IOrderItem>({
  title: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  description: {
    type: String,
  },
});

const predefinedData = [
  {
    title: "Суд",
    logo: "https://img.icons8.com/ios/100/law.png",
    description: "Представительство интересов в суде",
  },
  {
    title: "Нотариус",
    logo: "https://img.icons8.com/ios/50/approval--v1.png",
    description: "Представительство интересов в нотариальной конторе",
  },
  {
    title: "Составление документов",
    logo: "https://img.icons8.com/ios/50/document--v1.png",
    description: "Договоры, заявления, жалобы, исковые заявления",
  },
  {
    title: "Риелтор",
    logo: "https://img.icons8.com/external-ddara-lineal-ddara/64/external-realtor-real-estate-ddara-lineal-ddara.png",
    description: "Помощь в покупке/продаже недвижимости",
  },
  {
    title: "Полиция",
    logo: "https://img.icons8.com/ios/50/policeman-male.png",
    description: "Помощь в решении проблем с полицией",
  },
  {
    title: "Юридические лица",
    logo: "https://img.icons8.com/ios/50/company.png",
    description: "Помощь в решении проблем с юридических лиц",
  },
  {
    title: "Следствие",
    logo: "https://img.icons8.com/ios/50/spy-male.png",
    description: "Помощь в решении проблем с следствием",
  },
  {
    title: "ЗПП",
    logo: "https://img.icons8.com/external-happy-man-bomsymbols-/91/external-consumer-protection-happy-man-human-resource-and-life-style-color-set-1-happy-man-bomsymbols-.png",
    description: "Закон о защите прав потребителей",
  },
  {
    title: "ЖКХ",
    logo: "https://img.icons8.com/ios/50/equal-housing-opportunity.png",
    description: "Жилищно-коммунальное хозяйство",
  },
  {
    title: "Иная",
    logo: "https://img.icons8.com/external-tal-revivo-regular-tal-revivo/96/external-share-office-building-location-to-other-peers-jobs-regular-tal-revivo.png",
    description: "Помощь в решении проблем с другими организациями",
  },
];

let orderItems: Model<IOrderItem>;
if (models.orderItems) {
  orderItems = mongoose.model<IOrderItem>("orderItems");
} else {
  orderItems = mongoose.model<IOrderItem>("orderItems", orderItemsSchema);
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
