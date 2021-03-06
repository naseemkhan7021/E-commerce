module.exports = class APIfeatures {
     constructor(query, queryStr) {
          this.query = query;
          this.queryStr = queryStr;
          this.pageDataLen = 0;
     }

     search() {
          const keyword = this.queryStr.keyword ? {
               name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i' // case insansitive 's' -> sansitive
               }
          } : {};
          this.query = this.query.find({ ...keyword },);
          return this;
     }
     // db.products.find({ seller: { $in: ["Lenovo"] } }) filter by array
     filter() {
          const queryCopy = { ...this.queryStr };
          // remove fields from the query 
          const removeFields = ['keyword', 'limit', 'page'];
          removeFields.forEach(element => delete queryCopy[element]);

          // Advance filter for price, rating etc. 
          let queryStr = JSON.stringify(queryCopy);
          queryStr = queryStr.replace(/(gt|gte|lt|lte)/g, match => `$${match}`) // make $gt,$gte,$lt,$lte for mogo search


          this.query = this.query.find(JSON.parse(queryStr));
          return this;
     }
     pagination(resParPage) {
          const currentPage = Number(this.queryStr.page) || 1;
          const skip = resParPage * (currentPage - 1);

          this.query = this.query.limit(resParPage).skip(skip);
          return this;
     }
};