module.exports = function(l,b,callback){
    if(l < 0 || b<0){
        throw error("Invalid set of inputs");
    }

    try{
        callback(null, {
                        perimeter: function () {
                            return 2 * (l * b);
                        },
                        area: function () {
                            return (l + b);
                        }
            }
        )}
        catch(error){
            callback(error,null);
    }
}