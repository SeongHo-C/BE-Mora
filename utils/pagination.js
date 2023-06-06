const getPagination = (page, size) => {
  const limit = size ? +size : 10; // 한 페이지당 보이는 데이터 양
  const offset = page ? page * limit : 0; // 데이터의 (초기) 위치값
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: objArr } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, objArr, totalPages, currentPage };
};

module.exports = { getPagination, getPagingData };
