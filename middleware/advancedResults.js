const advancedResults = (model, populate) => async(req, res, next) => {
    let query;
    
    // copy req.query
    let req_query = { ...req.query };
    
    // fields to exclude
    const remove_fields = ['select', 'sort', 'page', 'limit'];
    
    // loop over remove_fields and remove them from req_query
    remove_fields.forEach(param => delete req_query[param]);
    
    // create query string
    let query_str = JSON.stringify(req_query);
    
    // create operators
    query_str = query_str.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    // find resource
    query = model.find(JSON.parse(query_str));
    
    // select fields
    if(req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }
    
    // sort
    if(req.query.sort) {
        const sort_by = req.query.sort.split(',').join(' ');
        query = query.sort(sort_by);
    }
    
    // populate
    if(populate) {
        query = query.populate(populate);
    }
    
    // execute query
    const results = await query;
    
    res.advancedResults = {
        success: true,
        count: results.length,
        data: results
    };
    
    next();
};

module.exports = advancedResults;