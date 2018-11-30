import ApiManager from '../components/ApiManager'

export const filterTraining = (searchTerm, allTrainings, callback) => {
    let result;
    if (searchTerm === '') {
        console.log("here")
        ApiManager.getTrainingList()
            .then((trainings) => {
                result = trainings
            })
        // filterTrainings = ApiManager.getTrainingList()
        //     .then((trainings) => {
        //         return trainings
        //     })
        // // }), (data) => {
        // //     callback(data);
        // // }`
    } else {
        console.log(allTrainings);
        result = allTrainings.filter(function (training) {
            return (training.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
        });
    }



    //  console.log(!result)

    console.log(result)
    callback(result);
}