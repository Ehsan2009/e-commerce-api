import {
  ObjectId
} from 'mongodb';

[
  {
    '$match': {
      'product': new ObjectId('6a2af6767c897ba67e3f71bc')
    }
  }, {
    '$group': {
      '_id': null, 
      'averageRating': {
        '$avg': '$rating'
      }, 
      'numOfReviews': {
        '$sum': 1
      }
    }
  }
]