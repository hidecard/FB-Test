// Import the Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3U2gXv6AjgY_wf2c_GBqpoT83LaroWns",
  authDomain: "messager-4abd8.firebaseapp.com",
  databaseURL: "https://messager-4abd8.firebaseio.com",
  projectId: "messager-4abd8",
  storageBucket: "messager-4abd8.appspot.com",
  messagingSenderId: "650985879545",
  appId: "1:650985879545:web:77492f5da7de018d40af28"
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
