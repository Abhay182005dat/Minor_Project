import tensorflow as tf


# Check if GPU is available
print("GPU Available: ", tf.test.is_built_with_cuda())

# List physical devices
gpus = tf.config.list_physical_devices('GPU')
print("GPUs detected:", gpus)

if not gpus:
    print("No GPU found. Exiting...")
    exit()

# Correct device string
gpu_index = 0
gpu_device = f'/GPU:{gpu_index}'
print("Using GPU:", gpu_device)

size = 4000  # Matrix size (fit in 4GB VRAM)

# Create matrices directly on GPU
with tf.device(gpu_device):
    a = tf.random.normal((size, size))
    b = tf.random.normal((size, size))

print("Starting GPU-only stress test. Press Ctrl+C to stop.")

iteration = 0
try:
    with tf.device(gpu_device):
        while True:
            iteration += 1
            c = tf.matmul(a, b)
            tf.print("Iteration", iteration, "done on device:", c.device)
except KeyboardInterrupt:
    print("Stress test stopped by user.")
