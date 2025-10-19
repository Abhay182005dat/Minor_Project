import tensorflow as tf
from tensorflow.keras.optimizers import Adam

# Load trained TensorFlow/Keras model once when this module is imported
MODEL_PATH = 'Model.h5' 
model = tf.keras.models.load_model(MODEL_PATH,compile=False)

model.compile(optimizer=Adam(learning_rate=0.001), loss='categorical_crossentropy', metrics=['accuracy'])



def predict_from_tensor(img_tensor):
    """
    Takes a preprocessed image tensor, runs model inference,
    and returns predicted class label and confidence.
    """
    preds = model.predict(img_tensor)
    pred_class = preds.argmax(axis=1)[0]
    confidence = float(preds[0][pred_class])

    label_map = {0: "Fake", 1: "Real"}  # Adjust as per your classes
    predicted_label = label_map.get(pred_class, "Unknown")

    return predicted_label, confidence
