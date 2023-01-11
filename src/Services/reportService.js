const {Product} = require('../Models/Products');
exports.getReport = async () => {
    const totalProducts = await Product.countDocuments();
    const totalQuantity = await Product.aggregate([
        {
            $group: {
                _id: null,
                totalQuantity: {
                    $sum: '$quantity'
                }
            }
        }
    ]);
    const totalPrice = await Product.aggregate([
        {
            $group: {
                _id: null,
                totalPrice: {
                    $sum: '$price'
                }
            }
        }
    ]);
    const averagePrice = await Product.aggregate([
        {
            $group: {
                _id: null,
                averagePrice: {
                    $avg: '$price'
                }
            }
        }
    ]);
    const averageQuantity = await Product.aggregate([
        {
            $group: {
                _id: null,
                averageQuantity: {
                    $avg: '$quantity'
            }
        }
    }
    ]);
    const maxPrice = await Product.aggregate([
        {
            $group: {
                _id: null,
                maxPrice: {
                    $max: '$price'
                }
            }
        },
        {
            
            $lookup: {
                from: 'products',
                localField: 'maxPrice',
                foreignField: 'price',
                as: 'maxPriceItem'
            }
        },
        {
            $unwind: '$maxPriceItem'
        }
    ]);
    const minPrice = await Product.aggregate([
        {
            $group: {
                _id: null,
                minPrice: {
                    $min: '$price'
                }
            }
        },
        {
            $lookup: {
                from: 'products',
                localField: 'minPrice',
                foreignField: 'price',
                as: 'minPriceItem'
            }
        },
        {
            $unwind: '$minPriceItem',
            
        }    
    ]);
    const maxQuantity = await Product.aggregate([
        {
            $group: {
                _id: null,
                maxQuantity: {
                    $max: '$quantity'
                }
            }
        },
        {
            $lookup: {
                from: 'products',
                localField: 'maxQuantity',
                foreignField: 'quantity',
                as: 'maxQuantityItem'
            }
        },
        {
            $unwind: '$maxQuantityItem'
        }
    ]);
    const minQuantity = await Product.aggregate([
        {
            $group: {
                _id: null,
                minQuantity: {
                    $min: '$quantity'
                }
            }
        },
        {
            $lookup: {
                from: 'products',
                localField: 'minQuantity',
                foreignField: 'quantity',
                as: 'minQuantityItem'
        }
    },
    {
        $unwind: '$minQuantityItem'
    }
]);

    const report = {
        totalProducts,
        totalQuantity,
        totalPrice,
        averagePrice,
        averageQuantity,
        maxPrice,
        minPrice,
        maxQuantity,
        minQuantity
    };
    return report;
};