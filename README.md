# Face Rating Application

This application is designed to rate faces using a machine learning model. It's crafted with fun in mind, and while it showcases some advanced techniques and impressive results, it's important to remember that the scores shouldn't be taken too seriously.
 
[Click here to view website](https://samueltesfai.github.io/face-rater)

## Model Development

### ResNet Architecture

The core of our application is a model that utilizes the ResNet architecture, specifically `ResNet50V2`, as a feature extractor. This deep neural network is known for its capability to capture intricate patterns and details, making it ideal for our face-rating task.

### Hyperparameter Tuning

Hyperparameter tuning was conducted in two main stages using Bayesian optimization:

1. **Broad Search:** The initial stage was a broad exploration of hyperparameters. This process was specifically to determine the optimal number of dense layers on top of the frozen ResNet model, the units in each of those layers, and whether to include dropout layers or not.
  
2. **Focused Search:** Based on the insights from the initial stage, a more focused search was conducted within a narrowed hyperparameter space.

The models from different configurations were trained up to 20 epochs. From the collective results, it became evident that a smaller number of layers on top of the ResNet model were favorable. Some of the best configurations were hand-picked and tested for up to 100 epochs, and the best performing one was picked as the final model. The final model employed by the app has a single dense layer with 64 units appended to the ResNet model, followed by the output layer.

### Training Data

The model was trained using the [Chicago Face Database (CFD)](https://www.chicagofaces.org/), which comprises images of 597 unique individuals from diverse ethnic backgrounds. This dataset ensures a robust and varied training set. Each image used from this dataset showcases a neutral facial expression, ensuring consistency. Notably, no data augmentation was performed, retaining the original essence of the dataset. Not only is there potential in enriching the dataset with data augmentation, but also by leveraging other image sets within the CFD, presenting a promising direction for future enhancements.

### Performance

The results of our model testing phase were impressive. On average, the model achieved a Mean Absolute Error (MAE) of 0.0083. To provide context for this number, consider that a naive regressor—always predicting the mean value—produces an MAE of about 0.10 on the test set. Therefore, our model, predicting within the range of 0 to 1, has an average deviation of just 0.83%. This speaks to the efficacy of both the architecture chosen and the hyperparameter tuning process.

However, it's crucial to understand that this model was trained on a relatively modest dataset. The labels for the images came from the average views of about 30 participants. Thus, while it's fun and intriguing, the model is not definitive or all-encompassing in its ratings.

## Application Architecture

### Client-Side Computation with TensorFlow.js

We utilize TensorFlow.js on the client side, allowing for direct processing within the user's browser. This shift enhances security, reduces latency, and maintains the integrity of our face rating scores computation without the need for a traditional back-end.

With the adoption of TensorFlow.js, the previously used AWS Elastic Beanstalk and API Gateway have been eliminated, leading to a more streamlined architecture and improved user experience.

### Front-End

Crafted with React, our front-end delivers an interactive and dynamic user experience. Integration with Bootstrap guarantees a responsive and visually appealing interface, making the application accessible from any device. GitHub pages hosts the entire front-end, ensuring reliable and quick access for users.