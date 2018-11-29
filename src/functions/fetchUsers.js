// import { getTrainingListByToken } from './getRequest';

// export const filterTraining = (searchTerm, token, allTrainings, callback) => {
//     var filterTrainings;
//             if (searchTerm === ''){
//                 getTrainingListByToken(token, (data) => {
//                     callback(data);
//                 })
//             }

//             console.log(allTrainings);
//             filterTrainings = allTrainings.filter(function (training) {
//                 return (training.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
//             });

//            console.log(filterTrainings)
//             callback(filterTrainings);
// }