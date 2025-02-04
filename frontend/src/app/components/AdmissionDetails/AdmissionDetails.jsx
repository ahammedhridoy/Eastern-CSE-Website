"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const AdmissionDetails = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/files/Admission_Form.pdf";
    link.download = "Admission_Form.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="">
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className=" text-3xl  text-[var(--black-color)] font-bold"
        >
          Admission Informations
        </Typography>

        <Typography
          gutterBottom
          variant="h4"
          component="div"
          className="text-2xl font-semibold text-[--primary-color] mb-2"
        >
          Admission Schedule
        </Typography>

        <Typography
          variant="p"
          className="text-justify text-[var(--gray-color)]"
        >
          Eastern University admits students every semester. Admission schedule
          of the semester showing deadlines for admission form submission,
          admission test, admission fee payment, registration, withdrawal, class
          commencement etc. is available on the website of the University. The
          admission schedule may also be known from the Admission Office and
          from frequent admission announcements published by the University in
          the leading newspapers. The students seeking admission should visit
          Website of Eastern University or contact the Admission Office for
          admission form and further information.
        </Typography>

        {/* ********** */}
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          className="text-2xl font-semibold text-[--primary-color] mt-4"
        >
          Admission Test:
        </Typography>

        <Typography
          variant="p"
          className="text-justify text-[var(--gray-color)]"
        >
          Due to Covid 19 pandemic circumstances no admission test is required.
          Candidate will get admission through online as per instruction
          mentioned below.
        </Typography>

        {/* ********** */}
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          className="text-2xl font-semibold text-[--primary-color] mt-4"
        >
          How to apply for admission?
        </Typography>

        <Typography
          variant="p"
          className="text-justify text-[var(--gray-color)]"
        >
          Students seeking admission can collect Admission Form from admission
          office paying Tk.500 OR download it from the website following the
          link given bellow and can submit the same either online or directly to
          admission office.
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            onClick={handleDownload}
            className="text-2xl font-semibold text-[--primary-color] hover:underline cursor-pointer mt-4 underline underline-offset-4"
          >
            Download Admission Form
          </Typography>
        </Typography>

        {/* ********** */}
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          className="text-2xl font-semibold text-[--primary-color] mt-4"
        >
          Direct submission
        </Typography>

        <Typography
          variant="p"
          className="text-justify text-[var(--gray-color)]"
        >
          • Visit admission office and submit the filled in application form
          with 2 passport size color photographs.
        </Typography>

        {/* ********** */}
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          className="text-2xl font-semibold text-[--primary-color] mt-4"
        >
          Online submission
        </Typography>

        <Typography
          variant="p"
          className="text-justify text-[var(--gray-color)]"
        >
          • Kindly make a payment of BDT 500 from your bKash personal account to
          01795711361 and preserve the bKash Transaction ID. <br />• Go to{" "}
          <Link
            target="_blank"
            className="text-[var(--primary-color)] hover:underline cursor-pointer"
            href="https://www.easternuni.edu.bd"
          >
            EU Website
          </Link>{" "}
          , go to admission, go to{" "}
          <Link
            target="_blank"
            className="text-[var(--primary-color)] hover:underline cursor-pointer"
            href="https://webportal.easternuni.edu.bd/onlineadmission/Admission.aspx"
          >
            Online Admission Form
          </Link>{" "}
          <br />
          • Fill in the form and submit. <br />• Insert the TrxID number. <br />
          • Submit the form online.
        </Typography>

        {/* ********** */}
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          className="text-2xl font-semibold text-[--primary-color] mt-4"
        >
          Payment through bkash for Admission form
        </Typography>

        <Typography
          gutterBottom
          variant="h4"
          component="div"
          className="text-2xl font-semibold text-[--primary-color] mt-4"
        >
          International Students
        </Typography>

        <Typography
          variant="p"
          className="text-justify text-[var(--gray-color)]"
        >
          Individuals who are not citizens or permanent residents of Bangladesh
          are defined as international applicants. International applicants
          seeking admission into EU must meet the same academic standards as
          those required for Bangladeshi students. There are wide variations,
          however, among educational systems throughout the world that make an
          exact comparison of educational standards difficult. International
          applicants who cannot sit for admission test are selected on the basis
          of their prior academic results, English proficiency, probability of
          success in the chosen curriculum as evidenced by prior work in the
          academic area involved, and certification of adequate financial
          resources.
        </Typography>

        {/* ********** */}

        <Typography
          gutterBottom
          variant="h4"
          component="div"
          className="text-2xl font-semibold text-[--primary-color] mt-4"
        >
          Transfer Students
        </Typography>

        <Typography
          variant="p"
          className="text-justify text-[var(--gray-color)]"
        >
          Transfer students are expected to have at least a 2.50 CGPA on a
          4-point scale at the University level programs to be considered for
          admission to Eastern University. They have to sit for and pass the
          Admission Test unless waived by EU Authority. Catalogs and official
          transcripts from previously attended Universities must be furnished
          with the application for admission. If needed, transcripts may have to
          be sent directly to the EU Registrar's Office from each institution
          attended. An undergraduate student may transfer (through grade
          transfer or course exemption or a combination of both) a maximum of 35
          percent of the total credit hours required for the degree in question
          at EU. In exceptional cases, the Equivalence Committee may, on
          recommendation of concerned Dean, consider extending the credits up to
          40 percent. Courses with C+ grades as per Eastern University standard
          may be considered for transfer or exemption. For the purpose of
          transferring credits, the Equivalence Committee of the Uni?ersity
          determines equivalence of courses and grades for each transfer
          student. The curriculum, evaluation system and grading standard of the
          university from which the student is transferring must be comparable
          to those of Eastern University which reserves the right to make final
          decision on transfer
        </Typography>

        {/* ********** */}

        <Typography
          gutterBottom
          variant="h4"
          component="div"
          className="text-2xl font-semibold text-[--primary-color] mt-4"
        >
          Provisional Admission
        </Typography>

        <Typography
          variant="p"
          className="text-justify text-[var(--gray-color)]"
        >
          Students who have appeared at the last required examination for
          admission may apply for provisional admission. Every student must
          submit the required certificates and other documents at the time of
          admission. Applicants seeking admission who are not able to produce
          one or more documents at the time of admission may be admitted
          provisionally. All provisionally admitted students are required to
          submit appropriate documents within a given deadline as a prerequisite
          for continued enrollment.
        </Typography>

        {/* ********** */}
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          className="text-2xl font-semibold text-[--primary-color] mt-4"
        >
          Non-degree Students
        </Typography>

        <Typography
          variant="p"
          className="text-justify text-[var(--gray-color)]"
        >
          student of another university or equivalent educational institution
          may register in courses as non-degree student on payment of requisite
          fees for such students. The total number of courses s/he may register
          in shall not exceed 50 percent of the courses required for the degree.
        </Typography>

        {/* ********** */}
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          className="text-2xl font-semibold text-[--primary-color] mt-4"
        >
          Course Waiver/Exemption for Graduate Students
        </Typography>

        <Typography
          variant="p"
          className="text-justify text-[var(--gray-color)]"
        >
          A graduate student with undergraduate degree from Eastern University
          may get waiver or exemption of courses to a maximum of 50% of the
          total credits required for the degree. A graduate student with
          undergraduate degree from other universities may get waiver or
          exemption of courses to a maximum of 35% of the total credits required
          for the degree. In exceptional cases, the limit may be raised to 40%
          by the appropriate authority. Transcripts and other supporting
          documents must be submitted with the application for exemption/waiver.
          student may apply for exemption from courses of other universities in
          which s/he has at least B – grades and the course contents match at
          least up to 85% with the contents of the corresponding course at EU.
        </Typography>

        {/* ********** */}
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          className="text-2xl font-semibold text-[--primary-color] mt-4"
        >
          Student Identification Card
        </Typography>

        <Typography
          variant="p"
          className="text-justify text-[var(--gray-color)]"
        >
          A new student receives, upon admission, an identification (ID) card
          with a unique number. This card is used for entering and staying in
          the campus, attending classes, using the library, internet and
          computer services, etc. The students must take good care of the ID and
          must report of its loss, if any, to the Registrar’s Office immediately
          so that the card can be cancelled to prevent its misuse. The
          Registrar’s Office will issue a duplicate ID Card upon application and
          payment of fees by the student. A student is liable to pay for any
          loss incurred by the University for the missing the card.
        </Typography>

        {/* ********** */}
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          className="text-2xl font-semibold text-[--primary-color] mt-4"
        >
          Orientation
        </Typography>

        <Typography
          variant="p"
          className="text-justify text-[var(--gray-color)]"
        >
          All new students must participate in the orientation program at the
          beginning of the semester. Students are encouraged to bring along
          their parents / guardians to the orientation ceremony. The orientation
          program acquaints the students with the academic system of the
          University, academic rules, educational opportunities, facilities and
          services available at the University.
        </Typography>

        {/* ********** */}
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          className="text-2xl font-semibold text-[--primary-color] mt-4"
        >
          Admission Office :
        </Typography>

        <Typography
          variant="p"
          className="text-justify text-[var(--gray-color)]"
        >
          The Admission Office is located on Campus Building of the University &
          at the following address : <br />
          <br />
          Eastern University <br />
          Road 6, Block B, Ashulia Model Town, Akran, Savar Dhaka. <br />
          Phone: 09602666651 Cell: 01844169651, 01844169659 01844169660,
          01741300002 <br />
          E-mail: admission@easternuni.edu.bd
        </Typography>
      </CardContent>
    </div>
  );
};

export default AdmissionDetails;
