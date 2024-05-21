
export const replaceMongoIdInArray = (array:any) => {
  const mappedArray = array
    .map((item:any) => {
      return {
        id: item._id.toString(),
        ...item,
      };
    })
    .map(({ _id, ...rest }:any) => rest);

  return mappedArray;
};

export const replaceMongoIdInObject = (obj:any) => {
  const { _id, ...updatedObj }:any = { ...obj, id: obj._id.toString() };
  return updatedObj;
};
export const replaceMongoIdInObjectID = (obj:any) => {
  const { _id, id }:any = { ...obj, id: obj._id.toString() };

  return id;
};
