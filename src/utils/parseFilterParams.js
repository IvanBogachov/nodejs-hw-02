const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isContactType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

const parseBoolean = (isFavourite) => {
  const isString = typeof isFavourite === 'string';
  if (!isString) return;

  const lowerCaseValue = isFavourite.toLowerCase();

  if (lowerCaseValue === 'true') {
    return true;
  }

  if (lowerCaseValue === 'false') {
    return false;
  }

  return; // Повертає undefined, якщо значення не можна розпізнати як Boolean
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
