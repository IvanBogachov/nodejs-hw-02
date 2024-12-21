import { ContactsCollection } from '../models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  // Додаємо фільтр userId
  filter.userId = userId;

  // Видаляємо undefined значення
  Object.keys(filter).forEach((key) => {
    if (filter[key] === undefined || filter[key] === null) {
      delete filter[key];
    }
  });

  // console.log('--- ЛОГ ЗАПИТУ ---');
  // console.log('Фільтр перед запитом:', filter);
  // console.log(`Параметри пагінації: limit=${limit}, skip=${skip}`);
  // console.log(`Сортування: поле=${sortBy}, порядок=${sortOrder}`);

  const contactsQuery = ContactsCollection.find(filter);
  console.log(filter);

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findById({
    _id: contactId,
    userId, // Додаємо перевірку userId
  });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId, // Перевіряємо, чи контакт належить користувачу
  });

  return contact;
};

export const updateContact = async (
  contactId,
  payload,
  userId,
  options = {},
) => {
  const { upsert = false } = options;
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      upsert,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  const isNew = Boolean(rawResult?.lastErrorObject?.upserted);

  return {
    isNew,
    contact: rawResult.value,
  };
};
