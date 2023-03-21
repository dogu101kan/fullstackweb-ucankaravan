const searchHelper = (searchKey, query, req) => {

    if ( req.query.search){
        const searchObject = {};

        const regex = new RegExp(req.query.search, "i");
        searchObject[searchKey] = regex;

        return query.where(searchObject);
    }

    return query;
};

const populateHelper = (query, population) => {
    return query.populate(population);
};

const questionSortHelper = (query, req) => {

    const sortKey = req.query.sortBy;
    
    if (sortKey === "most-answered"){
        return query.sort("-answerCount -createdAt");
    }
    if (sortKey === "most-liked"){
        return query.sort("-likeCount -createdAt");
    }
    return query.sort("-createdAt");

};

const albumSortHelper = (query, req) => {
    return query.sort("-createdAt");
}

const paginationHelper = async (model, query, req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const startIndex = (page -1) * limit;
    const endIndex = page * limit;

    const pagination = {};

    const total = await model.countDocuments();
    pagination.total = total;
    pagination.currentPage = page;

    if (startIndex > 0){
        pagination.previous = {
            page : page -1,
            limit : limit
        };
    }
    if (endIndex < total){
        pagination.next = {
            page : page +1,
            limit : limit
        };
    }

    return {
        query : query.skip(startIndex).limit(limit),
        pagination : pagination
    };
};
module.exports = {
    searchHelper,
    populateHelper,
    questionSortHelper,
    paginationHelper,
    albumSortHelper
}