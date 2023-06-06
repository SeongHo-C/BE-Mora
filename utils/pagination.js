const getPagination = (page, size) => {
  const limit = size ? +size : 5; // 한 페이지당 보이는 데이터 양
  const offset = page ? page * limit : 0; // 데이터의 (초기) 위치값
  console.log('2 page, size:', page, size);
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: objArr } = data;
  // console.log(
  //   '1 totalItems, objArr, page, limit:',
  //   totalItems,
  //   objArr,
  //   page,
  //   limit
  // );
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  // console.log('2 currentPage, totalPages:', currentPage, totalPages);

  return { totalItems, objArr, totalPages, currentPage };
};

module.exports = { getPagination, getPagingData };
