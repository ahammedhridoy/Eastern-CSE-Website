import React from "react";

const Map = () => {
  return (
    <div className="mt-10">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.655045020803!2d90.31364179126282!3d23.866380068852497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1f7ed5f4193%3A0x8159af0d71ff7374!2sEastern%20University!5e0!3m2!1sen!2sbd!4v1734980797423!5m2!1sen!2sbd"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
