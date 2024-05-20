export const replaceMongoIdInArray = (array:any) => {
  const mappedArray = array
    .map((item:any) => {
      return {
        id: item._id.toString(),
        ...item,
      };
    })
    .map(({ _id, ...rest }) => rest);

  return mappedArray;
};

export const replaceMongoIdInObject = (obj) => {
  const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
  return updatedObj;
};
export const replaceMongoIdInObjectID = (obj) => {
  const { _id, id } = { ...obj, id: obj._id.toString() };

  return id;
};
