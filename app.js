// Import the Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBstyCkk70BlLpbEDIiJyiz1IRJeukkU1U",
  authDomain: "solo-88a04.firebaseapp.com",
  projectId: "solo-88a04",
  storageBucket: "solo-88a04.appspot.com",
  messagingSenderId: "551679669330",
  appId: "1:551679669330:web:549e6a33c711eb5158db8b",
  measurementId: "G-09NGBJC6Y3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// HTML elements
const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");
const status = document.getElementById("status");

// Upload function
uploadButton.addEventListener("click", () => {
  const file = fileInput.files[0]; // Get the file from the input
  if (!file) {
    status.textContent = "Please select a file first.";
    return;
  }

  const storageRef = ref(storage, `uploads/${file.name}`); // Reference to storage path
  const uploadTask = uploadBytesResumable(storageRef, file); // Start the upload

  // Monitor the upload process
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Progress indicator
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      status.textContent = `Upload is ${progress.toFixed(2)}% done.`;
    },
    (error) => {
      // Handle errors
      status.textContent = `Upload failed: ${error.message}`;
    },
    () => {
      // Upload completed successfully
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        status.innerHTML = `Upload completed! <a href="${downloadURL}" target="_blank">View File</a>`;
      });
    }
  );
});
