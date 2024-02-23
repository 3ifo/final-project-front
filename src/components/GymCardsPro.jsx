const GymCardsPro = () => {
  return (
    <>
    <div>
      <h1 className="pro-card-h1">Consult the training <strong id="pro-card-h1-strong">plans</strong> of the month recommended <br /> by our <strong id="pro-card-h1-strong">professionals trainers.</strong></h1>
    </div>
    <section className="procard-container">
      <div className="pro-card pro-1">
        <div className="pro-card-overlay"></div>
        <div className="pro-card-img-container">
          
          <img className="personal-trainer" src="https://c4.wallpaperflare.com/wallpaper/126/971/651/fitness-gym-coach-training-wallpaper-preview.jpg" alt="" />
          <h3>Alex Philsson PT (Amateurs)</h3>
        </div>
        <div className="hidden-pro-info">
        <p className="duration">Duration: 30M</p>
        <p className="pro-card-type">Bulk</p>
        <p id="pro-card-difficult-easy">Easy</p>
        <p className="pro-card-type">Series: 3</p>
        <p><strong className="single-gymcard-strong">Training exercises: </strong><br />Bench Scott 3x8 <br /> Low Cable curl with straight bar 3x10 <br /> Lat Machine curl 3x10 <br /> Calf to leg press 3x20</p> 
        <p className="pro-card-notes">Notes: <br /> Perfect exercises for amateurs, short but intense.</p>
        </div>
      </div>
      <div className="pro-card pro-2">
      <div className="pro-card-overlay"></div>
        <div className="pro-card-img-container">
          <img className="personal-trainer" src="https://cdn.shopify.com/s/files/1/1633/7705/files/perfect_male_body_480x480.jpg" alt="" />
          <h3>Jesus Poti PT (Medium)</h3>
        </div>
        <div className="hidden-pro-info">
        <p className="duration">Duration: 40M</p>
        <p className="pro-card-type" >Bulk</p>
        <p id="pro-card-difficult-medium">Medium</p>
        <p className="pro-card-type">Series: 4</p>
        <p> <strong className="single-gymcard-strong">Training exercises:</strong> <br /> 30° Smith bench 3x8 <br /> High-cable cruises straight chest 3x10 <br /> Flat bench 3x10 <br /> 30° dumbbell bench crunches 3x10 </p> 
        <p className="pro-card-notes">Notes: <br /> Perfect exercises for intermediate, intense combo and focus on chest.</p>
        </div>
      </div>
      <div className="pro-card pro-3">
      <div className="pro-card-overlay"></div>
        <div className="pro-card-img-container">
          <img className="personal-trainer" src="https://wallpapercave.com/wp/wp8258626.jpg" alt="" />
          <h3>P.Wilson PT (Slayers) </h3>
        </div>
        <div className="hidden-pro-info">
        <p className="duration">Duration: 60M</p>
        <p className="pro-card-type">Bulk</p>
        <p id="pro-card-difficult-hard">Hard</p>
        <p className="pro-card-type">Series: 5</p>
        <p><strong className="single-gymcard-strong">Training exercises:</strong> <br /> Leg press 3x12 <br /> Leg extention 3x12 <br /> Leg press 45° 3x15 <br /> Leg Curl 3x12 </p>
        <p className="pro-card-notes">Notes: <br /> Exercises suitables for experts, your legs will explode with this combo!</p>
        </div>
      </div>
    </section>
    </>
  );
  
};

export default GymCardsPro;
