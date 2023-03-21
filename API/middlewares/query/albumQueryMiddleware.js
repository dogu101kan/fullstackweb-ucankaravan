const asyncErrorWrapper = require("express-async-handler");
const { paginationHelper, albumSortHelper } = require("./queryMiddlewareHelpers");

const albumQueryMiddleware = function(model){
    return asyncErrorWrapper(async function(req, res, next){
        let query = model.find();

        query = albumSortHelper(query, req);

        const paginationResult = await paginationHelper(model, query, req);

        query = paginationResult.query;
        const pagination = paginationResult.pagination;

        const queryResults = await query;

        res.queryResults={
            success : true,
            count : queryResults.length,
            pagination : pagination,
            data : queryResults
        };
        
        next();
    });
};

 module.exports = albumQueryMiddleware;