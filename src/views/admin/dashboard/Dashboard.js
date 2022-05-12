import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import Grid from '@material-ui/core/Grid'

//axios
import axios from 'axios'

//url base
import url_base from '../../../config/env'

//Loader
import Loader from '../../../assets/loader/Loader'

//informacion de urls
const url_1 = `${url_base}reservations/`
let config = {}

let reservation = {
  simple:0,
  junior:0,
  suite:0
}


export default function Dashboard() {
    //loading state
    const [loader, setLoader] = useState('none')
    const [simple,setSimple] = useState(0)
    const [junior,setJunior] = useState(0)
    const [suite,setSuite] = useState(0)
  //loading state

  useEffect(() => {
    const getData = async () =>{
      try{
        //pasar el token a config
        config.headers =  { Authorization: `Bearer ${localStorage.getItem('token')}` }
        //mostar lodaer
        setLoader('flex')
        let [data] = await Promise.allSettled([axios.get(url_1,config)])
        let simple_c = 0
        let junior_c = 0
        let suite_c = 0
        data.value.data.data.forEach(el=>{
          el.Categories.forEach(e=>{
            if(e.name==='simple'){
              simple_c = simple_c + e.ReservationCategories.amount
            }else if(e.name==='junior'){
              junior_c = junior_c + e.ReservationCategories.amount
            }else{
              suite_c = suite_c + e.ReservationCategories.amount
            }
          }) 
        })
        setSimple(simple_c)
        setJunior(junior_c)
        setSuite(suite_c)
        
        //esconder el loader
        setLoader('none')
      }catch(error){
        setLoader('none')
      }
    }
    getData()

  },[])

  useEffect(() => {
    console.log(simple,junior,suite)
  }, [simple,junior,suite])
  

  const data = [
    ["", "", { role: "style" }],
    ["Simple", simple, "blue"],
    ["Junior", junior, "red"],
    ["Suite", suite, "green"],
  ];

  const options = {
    title: "Today's Reservations",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total rooms per category",
      minValue: 0,
    },
    vAxis: {
      title: "Type",
    },
  };


  return (
    <Grid container spacing={1}>
      <Loader display={loader}/>
      <Grid item md={12}> 
      <div style={{boxShadow:"2px 2px 5px black"}}>
        <Chart
          chartType="BarChart"
          width="100%"
          height="320px"
          data={data}
          options={options}
        />
        </div>
      </Grid>
    </Grid>
  );
}