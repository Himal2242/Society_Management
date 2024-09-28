import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { auth } from './firebase'; // Import Firebase Auth
import { signOut } from 'firebase/auth'; // Import signOut function

const Homepage = () => {
  const [books, setBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(collection(db, 'books'));
      setBooks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const fetchRecommendedBooks = async () => {
      const recommendedQuery = query(collection(db, 'books'), orderBy('views', 'desc'), limit(3));
      const recommendedSnapshot = await getDocs(recommendedQuery);
      setRecommendedBooks(recommendedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchBooks();
    fetchRecommendedBooks();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6 text-center">E-Library</h1>
          <ul className="space-y-4">
            <li>
              <a href="#" className="block text-gray-700 hover:bg-blue-100 p-3 rounded-lg transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-700 hover:bg-blue-100 p-3 rounded-lg transition">
                My Uploads
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-700 hover:bg-blue-100 p-3 rounded-lg transition">
                Settings
              </a>
            </li>
          </ul>
          <div className="mt-8 border-t pt-4">
            <h2 className="font-bold mb-2">Notifications</h2>
            <p className="text-gray-600">You have no new notifications.</p>
          </div>
        </div>

        {/* Sign Out Button at the Bottom */}
        <button
          onClick={handleSignOut}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828780.png" // Logout icon
            alt="Log Out"
            className="h-5 w-5"
          />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Navbar */}
        <div className="flex justify-between items-center bg-white shadow-md p-4 mb-6 rounded-3xl">
          <h1 className="text-3xl font-medium">Books Available</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(book => (
            <div key={book.id} className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <p className="text-gray-700 mb-2">Author: {book.author}</p>
              <a
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mb-2 block"
              >
                Read Book
              </a>
              <p className="text-gray-500">Views: {book.views}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-center mt-10 mb-4">Recommended Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedBooks.map(book => (
            <div key={book.id} className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <p className="text-gray-700 mb-2">Author: {book.author}</p>
              <a
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mb-2 block"
              >
                Read Book
              </a>
              <p className="text-gray-500">Views: {book.views}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
