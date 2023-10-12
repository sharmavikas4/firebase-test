import { useEffect, useState } from 'react'
import './App.css'
import Login from './Components/Login'
import { db,auth,storage } from './firebase';
import {getDocs,collection,addDoc,deleteDoc,doc,updateDoc} from "firebase/firestore";
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"
function App() {
  const [movieList,setMovieList] = useState([]);
  const [newMovie,setNewMovie] = useState({
    title: "",
    releaseDate: 0,
    oscar: false,
    userId: ""
  });
  const [file,setFile] = useState(null);
  const [newTitle,setNewTitle] = useState([]);
  const moviesCollectionRef = collection(db,"movies");
  const getMovieList = async () => {
    await getDocs(moviesCollectionRef).then((res)=>{setMovieList(res.docs.map((doc)=>{ return {...doc.data(),id: doc.id}}))}).catch((err)=>{console.log(err)});
}
  useEffect(()=>{
    getMovieList();
  },[]);
  const change = (e)=>{
    const {name,value} = e.target
    setNewMovie((prevValue)=>{
      return name==="title"?{...prevValue,title: value}:(name==="releaseDate"?{...prevValue,releaseDate: value}:{...prevValue,oscar: e.target.checked});
    })
  }
  const add = async()=>{
    await addDoc(moviesCollectionRef,{...newMovie,userId: auth?.currentUser?.uid}).then((res)=>{setNewMovie({title:"",releaseDate:"",oscar: false}); getMovieList();}).catch((err)=>{console.log(err)});
  }
  const del = async(id)=>{
    const docu = doc(db,"movies",id);
    await deleteDoc(docu);
    getMovieList();
  }
  const titleChange = (e,i)=>{
    setNewTitle((prevValue)=>{
      prevValue[i]=e.target.value;
      return prevValue;
    });
  }
  const up = async (id,i)=>{
    const docu = doc(db, "movies", id);
    await updateDoc(docu,{title: newTitle[i]});
    getMovieList();
  }
  const upload = async()=>{
    if (!file) return;
    const reference = ref(storage,`${file.name}`);
    await uploadBytes(reference,file).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
    const url = await getDownloadURL(reference);
    console.log(url);
  }
  return (
    <>
      <Login/>
      <input placeholder="Movie title..." name="title" type="text" value={newMovie.title} onChange={change}></input>
      <input placeholder="Movie Release date..." name="releaseDate" type="number" value={newMovie.releaseDate} onChange={change}></input>
      <input placeholder="Movie got an oscar..." name="oscar" type="checkbox" value={newMovie.oscar} checked={newMovie.oscar} onChange={change}></input>
      <button onClick={add}>Submit</button>
      <div>
        {movieList&&movieList.map((movie,i)=>{
          return <div key={movie.id}>
            <h1 style={{color: movie.oscar?"green":"red"}}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>
            <input placeholder='Enter the new title' type="text" value={newTitle[i]} onChange={(e)=>{titleChange(e,i)}}/>
            <button onClick={()=>{up(movie.id,i)}}>Create a new title</button>
            <button onClick={()=>{del(movie.id)}}>Delete Movie</button>
            </div>
        })}
      </div>
      <div>
        <input type="file" placeholder='Add new file' onChange={(e)=>{setFile(e.target.files[0])}}></input>
        <button onClick={upload}>Upload</button>
      </div>
    </>
  )
}
export default App
