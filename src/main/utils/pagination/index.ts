interface GetPageAndLimitInput {
  query: {
    page?: number;
    limit?: number;
  };
  max?: number;
}

interface GetPageAndLimitOutput {
  skip: number;
  take: number;
}

export const getPagination = ({ query, max }: GetPageAndLimitInput): GetPageAndLimitOutput => {
  const page = query.page && Number(query.page) > 0 ? Number(query.page) : 1;
  let limit = query.limit && Number(query.limit) > 0 ? Number(query.limit) : 30;

  if (limit > (max || 50)) limit = max || 50;

  const skip = (page - 1) * limit;
  const take = limit;

  return { skip, take };
};
