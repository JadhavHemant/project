--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2024-03-19 14:56:16

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 228 (class 1259 OID 156504)
-- Name: ecosystems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ecosystems (
    id integer NOT NULL,
    ecosystem_name character varying(255),
    address character varying(255),
    location character varying(255),
    state character varying(255),
    country character varying(255),
    geo_coordinates character varying(255),
    contact_name character varying(255),
    contact_designation character varying(255),
    website_link character varying(255),
    phone_number character varying(20),
    email_address character varying(255),
    pincode character varying(10),
    sector character varying(255),
    areas_of_interest text
);


ALTER TABLE public.ecosystems OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 156503)
-- Name: ecosystems_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ecosystems_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ecosystems_id_seq OWNER TO postgres;

--
-- TOC entry 4964 (class 0 OID 0)
-- Dependencies: 227
-- Name: ecosystems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ecosystems_id_seq OWNED BY public.ecosystems.id;


--
-- TOC entry 242 (class 1259 OID 156619)
-- Name: interested_people_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.interested_people_table (
    id integer NOT NULL,
    interested_name character varying(255),
    email character varying(255),
    phonenumber character varying(20),
    interest_id integer,
    opportunity_id integer,
    opportunity_name character varying(255),
    memberid character varying(255),
    member_email character varying(255),
    event_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.interested_people_table OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 156618)
-- Name: interested_people_table_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.interested_people_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.interested_people_table_id_seq OWNER TO postgres;

--
-- TOC entry 4965 (class 0 OID 0)
-- Dependencies: 241
-- Name: interested_people_table_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.interested_people_table_id_seq OWNED BY public.interested_people_table.id;


--
-- TOC entry 226 (class 1259 OID 139458)
-- Name: member_interview_records; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.member_interview_records (
    id integer NOT NULL,
    interviewed_by character varying(255) NOT NULL,
    interview_assessment text,
    interview_score integer,
    interview_video_link character varying(255),
    opportunity_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.member_interview_records OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 139457)
-- Name: member_interview_records_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.member_interview_records_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.member_interview_records_id_seq OWNER TO postgres;

--
-- TOC entry 4966 (class 0 OID 0)
-- Dependencies: 225
-- Name: member_interview_records_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.member_interview_records_id_seq OWNED BY public.member_interview_records.id;


--
-- TOC entry 237 (class 1259 OID 156582)
-- Name: membercategory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.membercategory (
    categorycode character varying(40),
    categoryname character varying(100),
    categorydescription text,
    id integer NOT NULL
);


ALTER TABLE public.membercategory OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 156608)
-- Name: membercategory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.membercategory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.membercategory_id_seq OWNER TO postgres;

--
-- TOC entry 4967 (class 0 OID 0)
-- Dependencies: 240
-- Name: membercategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.membercategory_id_seq OWNED BY public.membercategory.id;


--
-- TOC entry 235 (class 1259 OID 156572)
-- Name: membergroupmaster; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.membergroupmaster (
    groupcode character varying(40),
    groupname character varying(100),
    groupdescription text,
    id integer NOT NULL
);


ALTER TABLE public.membergroupmaster OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 156588)
-- Name: membergroupmaster_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.membergroupmaster_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.membergroupmaster_id_seq OWNER TO postgres;

--
-- TOC entry 4968 (class 0 OID 0)
-- Dependencies: 238
-- Name: membergroupmaster_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.membergroupmaster_id_seq OWNED BY public.membergroupmaster.id;


--
-- TOC entry 234 (class 1259 OID 156559)
-- Name: members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.members (
    id integer NOT NULL,
    member_name character varying(255),
    member_code character varying(50),
    member_phone character varying(20),
    member_email character varying(255),
    member_password character varying(255),
    date_of_registration date,
    date_of_expire date,
    photo_image text,
    resume text,
    id_card_proof text,
    other_documents text,
    geolocation character varying(255),
    specialisation character varying(255),
    address text,
    city character varying(100),
    state character varying(100),
    pincode character varying(20),
    technology character varying(255),
    roll_number character varying(50),
    class_member character varying(50),
    discipline character varying(255),
    membergroup character varying(255),
    membercategory character varying(255),
    membertype character varying(255),
    id_student character varying(50),
    organization_name character varying(255),
    designation_role character varying(255),
    country character varying(100),
    interested_membership boolean,
    interested_research boolean,
    interested_startup boolean,
    interested_investments boolean,
    interested_mentoring boolean,
    membership_duration integer,
    membership_frequency_renewal character varying(50),
    membership_status character varying(50),
    flag boolean
);


ALTER TABLE public.members OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 156558)
-- Name: members_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.members_id_seq OWNER TO postgres;

--
-- TOC entry 4969 (class 0 OID 0)
-- Dependencies: 233
-- Name: members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.members_id_seq OWNED BY public.members.id;


--
-- TOC entry 220 (class 1259 OID 123098)
-- Name: membership_record; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.membership_record (
    membership_record_id integer NOT NULL,
    member_id integer,
    membership_type character varying(255),
    membership_category character varying(255),
    membership_duration integer,
    membership_frequency_renewal character varying(255),
    membership_status character varying(255)
);


ALTER TABLE public.membership_record OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 123097)
-- Name: membership_record_membership_record_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.membership_record_membership_record_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.membership_record_membership_record_id_seq OWNER TO postgres;

--
-- TOC entry 4970 (class 0 OID 0)
-- Dependencies: 219
-- Name: membership_record_membership_record_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.membership_record_membership_record_id_seq OWNED BY public.membership_record.membership_record_id;


--
-- TOC entry 236 (class 1259 OID 156577)
-- Name: membertype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.membertype (
    typecode character varying(40),
    typename character varying(100),
    typedescription text,
    id integer NOT NULL
);


ALTER TABLE public.membertype OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 156598)
-- Name: membertype_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.membertype_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.membertype_id_seq OWNER TO postgres;

--
-- TOC entry 4971 (class 0 OID 0)
-- Dependencies: 239
-- Name: membertype_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.membertype_id_seq OWNED BY public.membertype.id;


--
-- TOC entry 222 (class 1259 OID 131257)
-- Name: opportunities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.opportunities (
    id integer NOT NULL,
    opportunity_name text,
    opportunity_description text,
    opportunity_provider text,
    opportunity_start_date date,
    opportunity_end_date date,
    opportunity_problem_statement text,
    opportunity_expected_solution text,
    opportunity_expected_work_zone text,
    opportunity_expected_work_time text,
    opportunity_work_type text,
    opportunity_budget_available text,
    opportunity_estimate_budget text,
    budget_currency text,
    opportunity_resource_volume text,
    opportunity_status text,
    opportunity_code text,
    revised_volume character varying(255),
    revised_budget character varying(255),
    create_date character varying(255),
    opportunity_type_id integer,
    flag boolean,
    email character varying(255),
    member_id character varying(255),
    file_upload character varying(255),
    photos character varying(255)
);


ALTER TABLE public.opportunities OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 131256)
-- Name: opportunities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.opportunities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.opportunities_id_seq OWNER TO postgres;

--
-- TOC entry 4972 (class 0 OID 0)
-- Dependencies: 221
-- Name: opportunities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.opportunities_id_seq OWNED BY public.opportunities.id;


--
-- TOC entry 245 (class 1259 OID 156691)
-- Name: opportunities_with_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.opportunities_with_types (
    opportunity_type character varying(255),
    opportunity_names text[],
    opportunity_ids integer[]
);


ALTER TABLE public.opportunities_with_types OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 131266)
-- Name: opportunity_allocation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.opportunity_allocation (
    id integer NOT NULL,
    opportunity_id integer,
    opportunity_allocated_by character varying(255),
    opportunity_allocated_to character varying(255),
    opportunity_for character varying(255),
    opportunity_allocation_date date,
    opportunity_allocation_status character varying(50),
    opportunity_allocation_remark text,
    opportunity_details_doc character varying(255),
    memberrole character varying(100)
);


ALTER TABLE public.opportunity_allocation OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 131265)
-- Name: opportunity_allocation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.opportunity_allocation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.opportunity_allocation_id_seq OWNER TO postgres;

--
-- TOC entry 4973 (class 0 OID 0)
-- Dependencies: 223
-- Name: opportunity_allocation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.opportunity_allocation_id_seq OWNED BY public.opportunity_allocation.id;


--
-- TOC entry 244 (class 1259 OID 156628)
-- Name: opportunity_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.opportunity_types (
    id integer NOT NULL,
    opportunity_type character varying(255) NOT NULL
);


ALTER TABLE public.opportunity_types OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 156627)
-- Name: opportunity_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.opportunity_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.opportunity_types_id_seq OWNER TO postgres;

--
-- TOC entry 4974 (class 0 OID 0)
-- Dependencies: 243
-- Name: opportunity_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.opportunity_types_id_seq OWNED BY public.opportunity_types.id;


--
-- TOC entry 249 (class 1259 OID 156733)
-- Name: refre_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.refre_members (
    id integer NOT NULL,
    name character varying(255),
    srnumber character varying(255),
    referencename character varying(255),
    college character varying(255),
    discipline character varying(255),
    cla_ss character varying(255),
    rollnumber character varying(255),
    referenceemail character varying(255),
    referencephone character varying(255),
    membre_id integer
);


ALTER TABLE public.refre_members OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 156732)
-- Name: refre_members_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.refre_members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.refre_members_id_seq OWNER TO postgres;

--
-- TOC entry 4975 (class 0 OID 0)
-- Dependencies: 248
-- Name: refre_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.refre_members_id_seq OWNED BY public.refre_members.id;


--
-- TOC entry 218 (class 1259 OID 114857)
-- Name: research_refrence_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.research_refrence_table (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    srnumber character varying(100) NOT NULL,
    referencename character varying(100) NOT NULL,
    college character varying(100) NOT NULL,
    discipline character varying(100) NOT NULL,
    cla_ss character varying(100) NOT NULL,
    rollnumber character varying(255) NOT NULL,
    referenceemail character varying(255) NOT NULL,
    referencephone character varying(255) NOT NULL
);


ALTER TABLE public.research_refrence_table OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 114856)
-- Name: research_refrence_table_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.research_refrence_table ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.research_refrence_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 232 (class 1259 OID 156541)
-- Name: research_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.research_table (
    id integer NOT NULL,
    name character varying(255),
    designation character varying(255),
    organization character varying(255),
    phone_no character varying(20),
    email character varying(255),
    discipline character varying(255),
    research_topic character varying(255),
    research_category character varying(255),
    sub_research_category character varying(255),
    methodology text,
    abstract text,
    expected_outcome text,
    file_upload character varying(255),
    submit_date date,
    city character varying(255),
    state character varying(255),
    country character varying(255),
    validupto_date date,
    interested_membership boolean,
    interested_in_startup boolean,
    flag boolean
);


ALTER TABLE public.research_table OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 156540)
-- Name: research_table_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.research_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.research_table_id_seq OWNER TO postgres;

--
-- TOC entry 4976 (class 0 OID 0)
-- Dependencies: 231
-- Name: research_table_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.research_table_id_seq OWNED BY public.research_table.id;


--
-- TOC entry 251 (class 1259 OID 156742)
-- Name: resourcemaster; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.resourcemaster (
    resourceid integer NOT NULL,
    resourcename text,
    designation text,
    status text,
    empcode text,
    fromdate date,
    todate date
);


ALTER TABLE public.resourcemaster OWNER TO postgres;

--
-- TOC entry 250 (class 1259 OID 156741)
-- Name: resourcemaster_resourceid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.resourcemaster_resourceid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.resourcemaster_resourceid_seq OWNER TO postgres;

--
-- TOC entry 4977 (class 0 OID 0)
-- Dependencies: 250
-- Name: resourcemaster_resourceid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.resourcemaster_resourceid_seq OWNED BY public.resourcemaster.resourceid;


--
-- TOC entry 247 (class 1259 OID 156708)
-- Name: selection_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.selection_table (
    id integer NOT NULL,
    applicant_name character varying(255),
    phonenumber character varying(255),
    selection_status character varying(255),
    flag boolean,
    opportunity_name character varying(255),
    opportunity_id integer,
    status boolean,
    memberid integer
);


ALTER TABLE public.selection_table OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 156707)
-- Name: selection_table_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.selection_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.selection_table_id_seq OWNER TO postgres;

--
-- TOC entry 4978 (class 0 OID 0)
-- Dependencies: 246
-- Name: selection_table_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.selection_table_id_seq OWNED BY public.selection_table.id;


--
-- TOC entry 230 (class 1259 OID 156531)
-- Name: student_ideation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_ideation (
    id integer NOT NULL,
    student_name character varying(255),
    student_class character varying(50),
    student_roll_number character varying(50),
    student_phone_no character varying(20),
    email_id character varying(100),
    student_college character varying(255),
    description text,
    problem_statement text,
    solution text,
    technology_inract character varying(255),
    github_link character varying(255),
    power_point_document character varying(255),
    da_te_submited date,
    discipline character varying(100),
    city character varying(100),
    s_state character varying(100),
    country character varying(100),
    interested_in_membership character varying(50),
    interested_in_startup character varying(50),
    membervaliddate date,
    flag boolean
);


ALTER TABLE public.student_ideation OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 156530)
-- Name: student_ideation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.student_ideation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.student_ideation_id_seq OWNER TO postgres;

--
-- TOC entry 4979 (class 0 OID 0)
-- Dependencies: 229
-- Name: student_ideation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.student_ideation_id_seq OWNED BY public.student_ideation.id;


--
-- TOC entry 216 (class 1259 OID 98481)
-- Name: student_refrence_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_refrence_table (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    srnumber character varying(100) NOT NULL,
    referencename character varying(100) NOT NULL,
    college character varying(100) NOT NULL,
    discipline character varying(100) NOT NULL,
    cla_ss character varying(100) NOT NULL,
    rollnumber character varying(255) NOT NULL,
    referenceemail character varying(255) NOT NULL,
    referencephone character varying(255) NOT NULL
);


ALTER TABLE public.student_refrence_table OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 98480)
-- Name: student_refrence_table_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.student_refrence_table ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.student_refrence_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4728 (class 2604 OID 156507)
-- Name: ecosystems id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ecosystems ALTER COLUMN id SET DEFAULT nextval('public.ecosystems_id_seq'::regclass);


--
-- TOC entry 4735 (class 2604 OID 156622)
-- Name: interested_people_table id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interested_people_table ALTER COLUMN id SET DEFAULT nextval('public.interested_people_table_id_seq'::regclass);


--
-- TOC entry 4726 (class 2604 OID 139461)
-- Name: member_interview_records id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member_interview_records ALTER COLUMN id SET DEFAULT nextval('public.member_interview_records_id_seq'::regclass);


--
-- TOC entry 4734 (class 2604 OID 156609)
-- Name: membercategory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membercategory ALTER COLUMN id SET DEFAULT nextval('public.membercategory_id_seq'::regclass);


--
-- TOC entry 4732 (class 2604 OID 156589)
-- Name: membergroupmaster id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membergroupmaster ALTER COLUMN id SET DEFAULT nextval('public.membergroupmaster_id_seq'::regclass);


--
-- TOC entry 4731 (class 2604 OID 156562)
-- Name: members id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members ALTER COLUMN id SET DEFAULT nextval('public.members_id_seq'::regclass);


--
-- TOC entry 4723 (class 2604 OID 123101)
-- Name: membership_record membership_record_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership_record ALTER COLUMN membership_record_id SET DEFAULT nextval('public.membership_record_membership_record_id_seq'::regclass);


--
-- TOC entry 4733 (class 2604 OID 156599)
-- Name: membertype id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membertype ALTER COLUMN id SET DEFAULT nextval('public.membertype_id_seq'::regclass);


--
-- TOC entry 4724 (class 2604 OID 131260)
-- Name: opportunities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opportunities ALTER COLUMN id SET DEFAULT nextval('public.opportunities_id_seq'::regclass);


--
-- TOC entry 4725 (class 2604 OID 131269)
-- Name: opportunity_allocation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opportunity_allocation ALTER COLUMN id SET DEFAULT nextval('public.opportunity_allocation_id_seq'::regclass);


--
-- TOC entry 4737 (class 2604 OID 156631)
-- Name: opportunity_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opportunity_types ALTER COLUMN id SET DEFAULT nextval('public.opportunity_types_id_seq'::regclass);


--
-- TOC entry 4739 (class 2604 OID 156736)
-- Name: refre_members id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refre_members ALTER COLUMN id SET DEFAULT nextval('public.refre_members_id_seq'::regclass);


--
-- TOC entry 4730 (class 2604 OID 156544)
-- Name: research_table id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.research_table ALTER COLUMN id SET DEFAULT nextval('public.research_table_id_seq'::regclass);


--
-- TOC entry 4740 (class 2604 OID 156745)
-- Name: resourcemaster resourceid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resourcemaster ALTER COLUMN resourceid SET DEFAULT nextval('public.resourcemaster_resourceid_seq'::regclass);


--
-- TOC entry 4738 (class 2604 OID 156711)
-- Name: selection_table id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.selection_table ALTER COLUMN id SET DEFAULT nextval('public.selection_table_id_seq'::regclass);


--
-- TOC entry 4729 (class 2604 OID 156534)
-- Name: student_ideation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_ideation ALTER COLUMN id SET DEFAULT nextval('public.student_ideation_id_seq'::regclass);


--
-- TOC entry 4935 (class 0 OID 156504)
-- Dependencies: 228
-- Data for Name: ecosystems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ecosystems (id, ecosystem_name, address, location, state, country, geo_coordinates, contact_name, contact_designation, website_link, phone_number, email_address, pincode, sector, areas_of_interest) FROM stdin;
1	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
2	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
3	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
4	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
5	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
6	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
7	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
8	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
9	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
10	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
11	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
12	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
13	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
14	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
15	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
16	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
17	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
18	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
19	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
20	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
21	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
22	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
23	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
24	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
25	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
26	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
27	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
28	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
29	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
30	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
31	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
32	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
33	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
34	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
35	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
36	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
37	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
38	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
39	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
40	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
41	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
42	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
43	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
44	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
45	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
46	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
47	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
48	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
49	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
50	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
51	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
52	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
53	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
54	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
55	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
56	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
57	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
58	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
59	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
60	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
61	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
62	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
63	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
64	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
65	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
66	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
67	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
68	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
69	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
70	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
71	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
72	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
73	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
74	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
75	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
76	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
77	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
78	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
79	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
80	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
81	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
82	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
83	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
84	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
85	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
86	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
87	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
88	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
89	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
90	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
91	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
92	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
93	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
94	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
95	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
96	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
97	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
98	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
99	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
100	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
101	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
102	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
103	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
104	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
105	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
106	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
107	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
108	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
109	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
110	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
111	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
112	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
113	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
114	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
115	Ecosystem 1	123 Main St	City	State	Country	40.7128° N, 74.0060° W	John Doe	CEO	http://www.ecosystem1.com	+1234567890	info@ecosystem1.com	12345	Technology	Data Science, AI, Machine Learning
116	Ecosystem 2	456 Elm St	Town	State	Country	34.0522° N, 118.2437° W	Jane Smith	CTO	http://www.ecosystem2.com	+1987654321	info@ecosystem2.com	67890	Biotech	Genomics, Pharmaceuticals
117	Ecosystem 3	789 Oak St	Village	State	Country	51.5074° N, 0.1278° W	Alice Johnson	COO	http://www.ecosystem3.com	+9876543210	info@ecosystem3.com	54321	Renewable Energy	Solar, Wind, Hydroponics
\.


--
-- TOC entry 4949 (class 0 OID 156619)
-- Dependencies: 242
-- Data for Name: interested_people_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.interested_people_table (id, interested_name, email, phonenumber, interest_id, opportunity_id, opportunity_name, memberid, member_email, event_timestamp) FROM stdin;
2	abccsa	hemantjadhav7477@gmail.com	\N	21	231	new	\N	\N	2024-03-06 12:21:05.997907
3	abccsa	hj9294712@gmail.com	\N	21	237	abc	\N	\N	2024-03-06 12:21:06.061008
4	abccsa	hemantjadhav7477@gmail.com	\N	21	232	new	\N	\N	2024-03-06 12:21:06.088119
5	abccsa	hemantjadhav7477@gmail.com	\N	21	234	suuuu	\N	\N	2024-03-06 12:21:06.110843
6	abccsa	hemantjadhav7477@gmail.com	\N	21	235	suuuu	\N	\N	2024-03-06 12:21:06.111509
7	abccsa	hemantjadhav7477@gmail.com	\N	21	233	suuuu	\N	\N	2024-03-06 12:21:06.113316
8	abccsa	hemantjadhav7477@gmail.com	\N	21	230	new	\N	\N	2024-03-06 12:27:08.637908
9	abccsa	hemantjadhav7477@gmail.com	\N	21	232	new	\N	\N	2024-03-06 12:27:08.638854
10	abccsa	hemantjadhav7477@gmail.com	\N	21	235	suuuu	\N	\N	2024-03-06 12:27:08.644089
11	abccsa	hemantjadhav7477@gmail.com	\N	21	234	suuuu	\N	\N	2024-03-06 12:27:08.645059
12	abccsa	hemantjadhav7477@gmail.com	\N	21	231	new	\N	\N	2024-03-06 12:27:08.664955
13	abccsa	hemantjadhav7477@gmail.com	\N	21	233	suuuu	\N	\N	2024-03-06 12:27:08.67255
14	abccsa	hj9294712@gmail.com	\N	21	237	abc	\N	\N	2024-03-06 12:27:08.976525
15	hemant	hemantjadhav7477@gmail.com	\N	16	230	new	\N	\N	2024-03-06 12:29:29.918895
16	hemant	hemantjadhav7477@gmail.com	\N	16	231	new	\N	\N	2024-03-06 12:29:30.173905
17	hemant	hemantjadhav7477@gmail.com	\N	16	232	new	\N	\N	2024-03-06 12:29:30.243667
18	hemant	hemantjadhav7477@gmail.com	\N	16	234	suuuu	\N	\N	2024-03-06 12:29:30.267716
19	hemant	hemantjadhav7477@gmail.com	\N	16	235	suuuu	\N	\N	2024-03-06 12:29:30.272571
20	hemant	hemantjadhav7477@gmail.com	\N	16	233	suuuu	\N	\N	2024-03-06 12:29:30.276641
21	abccsa	hemantjadhav7477@gmail.com	\N	21	230	new	\N	\N	2024-03-06 12:29:52.69993
22	abccsa	hemantjadhav7477@gmail.com	\N	21	231	new	\N	\N	2024-03-06 12:29:52.967635
23	abccsa	hj9294712@gmail.com	\N	21	237	abc	\N	\N	2024-03-06 12:29:53.016704
24	abccsa	hemantjadhav7477@gmail.com	\N	21	233	suuuu	\N	\N	2024-03-06 12:29:53.053355
25	abccsa	hemantjadhav7477@gmail.com	\N	21	234	suuuu	\N	\N	2024-03-06 12:29:53.063905
26	abccsa	hemantjadhav7477@gmail.com	\N	21	232	new	\N	\N	2024-03-06 12:29:53.067318
27	abccsa	hemantjadhav7477@gmail.com	\N	21	235	suuuu	\N	\N	2024-03-06 12:29:53.075068
28	hemant	hemantjadhav7477@gmail.com	\N	16	230	new	\N	\N	2024-03-06 12:30:37.025143
29	hemant	hemantjadhav7477@gmail.com	\N	16	231	new	\N	\N	2024-03-06 12:30:37.274739
30	hemant	hemantjadhav7477@gmail.com	\N	16	232	new	\N	\N	2024-03-06 12:30:37.342123
31	hemant	hemantjadhav7477@gmail.com	\N	16	234	suuuu	\N	\N	2024-03-06 12:30:37.372049
32	hemant	hemantjadhav7477@gmail.com	\N	16	233	suuuu	\N	\N	2024-03-06 12:30:37.384016
33	hemant	hemantjadhav7477@gmail.com	\N	16	235	suuuu	\N	\N	2024-03-06 12:30:37.387137
34	hemant	hemantjadhav7477@gmail.com	\N	16	230	new	\N	\N	2024-03-06 12:42:10.089828
35	hemant	hemantjadhav7477@gmail.com	\N	16	231	new	\N	\N	2024-03-06 12:42:10.160577
36	hemant	hemantjadhav7477@gmail.com	\N	16	232	new	\N	\N	2024-03-06 12:42:10.168632
37	hemant	hemantjadhav7477@gmail.com	\N	16	233	suuuu	\N	\N	2024-03-06 12:42:10.173877
38	hemant	hemantjadhav7477@gmail.com	\N	16	235	suuuu	\N	\N	2024-03-06 12:42:10.18183
39	hemant	hemantjadhav7477@gmail.com	\N	16	234	suuuu	\N	\N	2024-03-06 12:42:10.185537
40	hemant	hemantjadhav7477@gmail.com	\N	16	230	new	\N	\N	2024-03-06 12:46:40.315089
41	hemant	hemantjadhav7477@gmail.com	\N	16	231	new	\N	\N	2024-03-06 12:46:40.575463
42	hemant	hemantjadhav7477@gmail.com	\N	16	235	suuuu	\N	\N	2024-03-06 12:46:40.666189
43	hemant	hemantjadhav7477@gmail.com	\N	16	234	suuuu	\N	\N	2024-03-06 12:46:40.672379
44	hemant	hemantjadhav7477@gmail.com	\N	16	232	new	\N	\N	2024-03-06 12:46:40.672796
45	hemant	hemantjadhav7477@gmail.com	\N	16	233	suuuu	\N	\N	2024-03-06 12:46:40.678789
46	hemant	hemantjadhav7477@gmail.com	\N	16	230	new	\N	\N	2024-03-06 12:48:51.105503
47	hemant	hemantjadhav7477@gmail.com	\N	16	231	new	\N	\N	2024-03-06 12:48:51.345455
48	hemant	hemantjadhav7477@gmail.com	\N	16	232	new	\N	\N	2024-03-06 12:48:51.423682
49	hemant	hemantjadhav7477@gmail.com	\N	16	235	suuuu	\N	\N	2024-03-06 12:48:51.462971
50	hemant	hemantjadhav7477@gmail.com	\N	16	233	suuuu	\N	\N	2024-03-06 12:48:51.464135
51	hemant	hemantjadhav7477@gmail.com	\N	16	234	suuuu	\N	\N	2024-03-06 12:48:51.472192
52	hemant	hemantjadhav7477@gmail.com	\N	16	230	new	\N	\N	2024-03-06 12:51:20.976517
53	hemant	hemantjadhav7477@gmail.com	\N	16	231	new	\N	\N	2024-03-06 12:51:20.977368
54	hemant	hemantjadhav7477@gmail.com	\N	16	232	new	\N	\N	2024-03-06 12:51:21.085509
55	hemant	hemantjadhav7477@gmail.com	\N	16	234	suuuu	\N	\N	2024-03-06 12:51:21.094907
56	hemant	hemantjadhav7477@gmail.com	\N	16	235	suuuu	\N	\N	2024-03-06 12:51:21.102419
57	hemant	hemantjadhav7477@gmail.com	\N	16	233	suuuu	\N	\N	2024-03-06 12:51:21.105506
58	hemant	hemantjadhav7477@gmail.com	\N	16	234	suuuu	\N	\N	2024-03-06 12:55:40.259884
59	hemant	hemantjadhav7477@gmail.com	\N	16	235	suuuu	\N	\N	2024-03-06 12:55:40.261451
60	hemant	hemantjadhav7477@gmail.com	\N	16	230	new	\N	\N	2024-03-06 12:55:40.286335
61	hemant	hemantjadhav7477@gmail.com	\N	16	233	suuuu	\N	\N	2024-03-06 12:55:40.295947
62	hemant	hemantjadhav7477@gmail.com	\N	16	232	new	\N	\N	2024-03-06 12:55:40.316374
63	hemant	hemantjadhav7477@gmail.com	\N	16	231	new	\N	\N	2024-03-06 12:55:40.340696
64	hemant	hemantjadhav7477@gmail.com	\N	16	230	new	\N	\N	2024-03-06 13:18:25.239566
65	hemant	hemantjadhav7477@gmail.com	\N	16	231	new	\N	\N	2024-03-06 13:18:25.501826
66	hemant	hemantjadhav7477@gmail.com	\N	16	232	new	\N	\N	2024-03-06 13:18:25.63597
67	hemant	hemantjadhav7477@gmail.com	\N	16	233	suuuu	\N	\N	2024-03-06 13:18:25.652908
68	hemant	hemantjadhav7477@gmail.com	\N	16	234	suuuu	\N	\N	2024-03-06 13:18:25.662978
69	hemant	hemantjadhav7477@gmail.com	\N	16	235	suuuu	\N	\N	2024-03-06 13:18:25.66328
70	hemant	hemantjadhav7477@gmail.com	\N	16	230	new	\N	\N	2024-03-06 13:24:41.26405
71	hemant	hemantjadhav7477@gmail.com	\N	16	231	new	\N	\N	2024-03-06 13:24:41.278552
72	hemant	hemantjadhav7477@gmail.com	\N	16	232	new	\N	\N	2024-03-06 13:24:41.294108
73	hemant	hemantjadhav7477@gmail.com	\N	16	235	suuuu	\N	\N	2024-03-06 13:24:41.306557
74	hemant	hemantjadhav7477@gmail.com	\N	16	234	suuuu	\N	\N	2024-03-06 13:24:41.306828
75	hemant	hemantjadhav7477@gmail.com	\N	16	233	suuuu	\N	\N	2024-03-06 13:24:41.326331
76	hemant	hemantjadhav7477@gmail.com	\N	16	231	new	\N	\N	2024-03-06 13:27:54.977862
77	hemant	hemantjadhav7477@gmail.com	\N	16	232	new	\N	\N	2024-03-06 13:27:54.990659
78	hemant	hemantjadhav7477@gmail.com	\N	16	233	suuuu	\N	\N	2024-03-06 13:27:55.067361
79	hemant	hemantjadhav7477@gmail.com	\N	16	230	new	\N	\N	2024-03-06 13:27:55.074076
80	hemant	hemantjadhav7477@gmail.com	\N	16	234	suuuu	\N	\N	2024-03-06 13:27:55.075288
81	hemant	hemantjadhav7477@gmail.com	\N	16	235	suuuu	\N	\N	2024-03-06 13:27:55.079147
82	hemant	hemantjadhav7477@gmail.com	\N	16	230	new	\N	\N	2024-03-06 13:36:38.148359
83	hemant	hemantjadhav7477@gmail.com	\N	16	231	new	\N	\N	2024-03-06 13:36:38.14992
84	hemant	hemantjadhav7477@gmail.com	\N	16	232	new	\N	\N	2024-03-06 13:36:38.150761
85	hemant	hemantjadhav7477@gmail.com	\N	16	233	suuuu	\N	\N	2024-03-06 13:36:38.2259
86	hemant	hemantjadhav7477@gmail.com	\N	16	235	suuuu	\N	\N	2024-03-06 13:36:38.247097
87	hemant	hemantjadhav7477@gmail.com	\N	16	234	suuuu	\N	\N	2024-03-06 13:36:38.25468
88	hemant	hemantjadhav7477@gmail.com	+919021654411	16	230	new	\N	\N	2024-03-06 13:49:52.087336
89	hemant	hemantjadhav7477@gmail.com	+919021654411	16	231	new	\N	\N	2024-03-06 13:49:52.394662
90	hemant	hemantjadhav7477@gmail.com	+919021654411	16	232	new	\N	\N	2024-03-06 13:49:52.395273
91	hemant	hemantjadhav7477@gmail.com	+919021654411	16	233	suuuu	\N	\N	2024-03-06 13:49:52.395787
92	hemant	hemantjadhav7477@gmail.com	+919021654411	16	235	suuuu	\N	\N	2024-03-06 13:49:52.519134
93	hemant	hemantjadhav7477@gmail.com	+919021654411	16	234	suuuu	\N	\N	2024-03-06 13:49:52.529483
94	hemant	hemantjadhav7477@gmail.com	+919021654411	16	231	new	\N	\N	2024-03-06 14:01:28.594195
95	hemant	hemantjadhav7477@gmail.com	+919021654411	16	232	new	\N	\N	2024-03-06 14:01:28.6061
96	hemant	hemantjadhav7477@gmail.com	+919021654411	16	233	suuuu	\N	\N	2024-03-06 14:01:28.610715
97	hemant	hemantjadhav7477@gmail.com	+919021654411	16	230	new	\N	\N	2024-03-06 14:01:28.668127
98	hemant	hemantjadhav7477@gmail.com	+919021654411	16	234	suuuu	\N	\N	2024-03-06 14:01:28.701436
99	hemant	hemantjadhav7477@gmail.com	+919021654411	16	235	suuuu	\N	\N	2024-03-06 14:01:28.70195
118	hemant	hemantjadhav7477@gmail.com	+919021654411	16	230	new	17	\N	2024-03-07 11:41:01.997794
119	hemant	hemantjadhav7477@gmail.com	+919021654411	16	231	new	17	\N	2024-03-07 11:41:01.998509
120	hemant	hemantjadhav7477@gmail.com	+919021654411	16	232	new	17	\N	2024-03-07 11:41:02.095884
121	hemant	hemantjadhav7477@gmail.com	+919021654411	16	233	suuuu	17	\N	2024-03-07 11:41:02.102081
122	hemant	hemantjadhav7477@gmail.com	+919021654411	16	234	suuuu	17	\N	2024-03-07 11:41:02.112922
123	hemant	hemantjadhav7477@gmail.com	+919021654411	16	235	suuuu	17	\N	2024-03-07 11:41:02.117263
124	hemant	hemantjadhav7477@gmail.com	+919021654411	16	230	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-07 11:42:25.81403
125	hemant	hemantjadhav7477@gmail.com	+919021654411	16	232	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-07 11:42:25.903893
126	hemant	hemantjadhav7477@gmail.com	+919021654411	16	231	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-07 11:42:25.908207
127	hemant	hemantjadhav7477@gmail.com	+919021654411	16	233	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-07 11:42:25.940343
128	hemant	hemantjadhav7477@gmail.com	+919021654411	16	234	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-07 11:42:25.946197
129	hemant	hemantjadhav7477@gmail.com	+919021654411	16	235	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-07 11:42:25.948348
130	hemant	hemantjadhav7477@gmail.com	+919021654411	16	230	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-07 11:44:34.087158
131	hemant	hemantjadhav7477@gmail.com	+919021654411	16	231	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-07 11:44:34.335332
132	hemant	hemantjadhav7477@gmail.com	+919021654411	16	232	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-07 11:44:34.406292
133	hemant	hemantjadhav7477@gmail.com	+919021654411	16	235	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-07 11:44:34.44276
134	hemant	hemantjadhav7477@gmail.com	+919021654411	16	233	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-07 11:44:34.447987
135	hemant	hemantjadhav7477@gmail.com	+919021654411	16	234	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-07 11:44:34.465653
137	hemant	hemantjadhav7477@gmail.com	+919021654411	16	230	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-13 10:23:57.190376
136	hemant	hemantjadhav7477@gmail.com	+919021654411	16	231	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-13 10:23:57.190962
138	hemant	hemantjadhav7477@gmail.com	+919021654411	16	235	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-13 10:23:57.288433
139	hemant	hemantjadhav7477@gmail.com	+919021654411	16	233	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-13 10:23:57.288763
140	hemant	hemantjadhav7477@gmail.com	+919021654411	16	232	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-13 10:23:57.289148
141	hemant	hemantjadhav7477@gmail.com	+919021654411	16	234	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-13 10:23:57.297879
142	abccsa	hemantjadhav7477@gmail.com	07249395351	21	230	new	17	hj9294712@gmail.com	2024-03-13 10:37:20.293078
143	abccsa	hemantjadhav7477@gmail.com	07249395351	21	231	new	17	hj9294712@gmail.com	2024-03-13 10:37:20.293888
144	abccsa	hemantjadhav7477@gmail.com	07249395351	21	232	new	17	hj9294712@gmail.com	2024-03-13 10:37:20.294767
145	abccsa	hemantjadhav7477@gmail.com	07249395351	21	235	suuuu	17	hj9294712@gmail.com	2024-03-13 10:37:20.299225
146	abccsa	hemantjadhav7477@gmail.com	07249395351	21	233	suuuu	17	hj9294712@gmail.com	2024-03-13 10:37:20.355529
147	abccsa	hemantjadhav7477@gmail.com	07249395351	21	234	suuuu	17	hj9294712@gmail.com	2024-03-13 10:37:20.367279
148	abccsa	hemantjadhav7477@gmail.com	07249395351	21	230	new	17	hj9294712@gmail.com	2024-03-13 10:38:05.10266
149	abccsa	hemantjadhav7477@gmail.com	07249395351	21	231	new	17	hj9294712@gmail.com	2024-03-13 10:38:05.103264
150	abccsa	hemantjadhav7477@gmail.com	07249395351	21	235	suuuu	17	hj9294712@gmail.com	2024-03-13 10:38:05.107273
151	abccsa	hemantjadhav7477@gmail.com	07249395351	21	232	new	17	hj9294712@gmail.com	2024-03-13 10:38:05.174032
152	abccsa	hemantjadhav7477@gmail.com	07249395351	21	233	suuuu	17	hj9294712@gmail.com	2024-03-13 10:38:05.181842
153	abccsa	hemantjadhav7477@gmail.com	07249395351	21	234	suuuu	17	hj9294712@gmail.com	2024-03-13 10:38:05.189861
154	hemant	hemantjadhav7477@gmail.com	+919021654411	16	230	new	\N	jadhavhemantbalkrushna@gmail.com	2024-03-14 11:09:56.724321
155	hemant	hemantjadhav7477@gmail.com	+919021654411	16	232	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 11:52:45.116326
157	hemant	hemantjadhav7477@gmail.com	+919021654411	16	230	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 11:52:45.115219
156	hemant	hemantjadhav7477@gmail.com	+919021654411	16	231	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 11:52:45.115789
158	hemant	hemantjadhav7477@gmail.com	+919021654411	16	235	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 11:52:45.183657
159	hemant	hemantjadhav7477@gmail.com	+919021654411	16	233	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 11:52:45.184102
160	hemant	hemantjadhav7477@gmail.com	+919021654411	16	234	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 11:52:45.184934
161	hemant	hemantjadhav7477@gmail.com	+919021654411	16	230	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 11:54:03.352756
162	hemant	hemantjadhav7477@gmail.com	+919021654411	16	231	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 11:54:03.35326
163	hemant	hemantjadhav7477@gmail.com	+919021654411	16	232	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 11:54:03.35416
164	hemant	hemantjadhav7477@gmail.com	+919021654411	16	233	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 11:54:03.426314
165	hemant	hemantjadhav7477@gmail.com	+919021654411	16	235	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 11:54:03.439654
166	hemant	hemantjadhav7477@gmail.com	+919021654411	16	234	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 11:54:03.44527
167	abccsa	hemantjadhav7477@gmail.com	07249395351	21	231	new	17	hj9294712@gmail.com	2024-03-14 11:57:52.328366
168	abccsa	hemantjadhav7477@gmail.com	07249395351	21	230	new	17	hj9294712@gmail.com	2024-03-14 11:57:52.350411
169	abccsa	hemantjadhav7477@gmail.com	07249395351	21	232	new	17	hj9294712@gmail.com	2024-03-14 11:57:52.378964
170	abccsa	hemantjadhav7477@gmail.com	07249395351	21	233	suuuu	17	hj9294712@gmail.com	2024-03-14 11:57:52.381653
171	abccsa	hemantjadhav7477@gmail.com	07249395351	21	235	suuuu	17	hj9294712@gmail.com	2024-03-14 11:57:52.38816
172	abccsa	hemantjadhav7477@gmail.com	07249395351	21	234	suuuu	17	hj9294712@gmail.com	2024-03-14 11:57:52.391529
173	hemant	hemantjadhav7477@gmail.com	+919021654411	16	230	new	\N	jadhavhemantbalkrushna@gmail.com	2024-03-14 12:20:42.880514
174	hemant	hemantjadhav7477@gmail.com	+919021654411	16	230	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 12:46:11.419025
175	hemant	hemantjadhav7477@gmail.com	+919021654411	16	231	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 12:46:11.419623
176	hemant	hemantjadhav7477@gmail.com	+919021654411	16	232	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 12:46:11.420496
177	hemant	hemantjadhav7477@gmail.com	+919021654411	16	233	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 12:46:11.548308
178	hemant	hemantjadhav7477@gmail.com	+919021654411	16	234	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 12:46:11.641621
179	hemant	hemantjadhav7477@gmail.com	+919021654411	16	235	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 12:46:11.652471
180	hemant	hemantjadhav7477@gmail.com	+919021654411	16	230	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 13:29:40.624469
181	hemant	hemantjadhav7477@gmail.com	+919021654411	16	231	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 13:29:40.625542
182	hemant	hemantjadhav7477@gmail.com	+919021654411	16	232	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 13:29:40.626448
183	hemant	hemantjadhav7477@gmail.com	+919021654411	16	233	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 13:29:40.695067
184	hemant	hemantjadhav7477@gmail.com	+919021654411	16	234	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 13:29:40.702646
185	hemant	hemantjadhav7477@gmail.com	+919021654411	16	235	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 13:29:40.70288
186	hemant	hemantjadhav7477@gmail.com	+919021654411	16	230	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 15:06:12.198358
187	hemant	hemantjadhav7477@gmail.com	+919021654411	16	231	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 15:06:12.428165
188	hemant	hemantjadhav7477@gmail.com	+919021654411	16	232	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 15:06:12.508495
189	hemant	hemantjadhav7477@gmail.com	+919021654411	16	233	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 15:06:12.534654
190	hemant	hemantjadhav7477@gmail.com	+919021654411	16	234	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 15:06:12.535561
191	hemant	hemantjadhav7477@gmail.com	+919021654411	16	235	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 15:06:12.542107
192	hemant	hemantjadhav7477@gmail.com	+919021654411	16	230	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 15:09:26.919658
193	hemant	hemantjadhav7477@gmail.com	+919021654411	16	231	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 15:09:27.139979
194	hemant	hemantjadhav7477@gmail.com	+919021654411	16	232	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 15:09:27.208953
195	hemant	hemantjadhav7477@gmail.com	+919021654411	16	233	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 15:09:27.233355
196	hemant	hemantjadhav7477@gmail.com	+919021654411	16	234	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 15:09:27.243844
197	hemant	hemantjadhav7477@gmail.com	+919021654411	16	235	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 15:09:27.26111
198	hemant	hemantjadhav7477@gmail.com	+919021654411	16	230	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 15:18:07.905482
199	hemant	hemantjadhav7477@gmail.com	+919021654411	16	231	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 15:18:07.906061
200	hemant	hemantjadhav7477@gmail.com	+919021654411	16	232	new	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 15:18:07.906994
201	hemant	hemantjadhav7477@gmail.com	+919021654411	16	233	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 15:18:08.004407
202	hemant	hemantjadhav7477@gmail.com	+919021654411	16	234	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 15:18:08.008505
203	hemant	hemantjadhav7477@gmail.com	+919021654411	16	235	suuuu	17	jadhavhemantbalkrushna@gmail.com	2024-03-14 15:18:08.023099
204	abccsa	hemantjadhav7477@gmail.com	07249395351	21	230	new	17	hj9294712@gmail.com	2024-03-14 15:23:04.847034
205	abccsa	hemantjadhav7477@gmail.com	07249395351	21	231	new	17	hj9294712@gmail.com	2024-03-14 15:23:04.925314
206	abccsa	hemantjadhav7477@gmail.com	07249395351	21	233	suuuu	17	hj9294712@gmail.com	2024-03-14 15:23:04.956637
207	abccsa	hemantjadhav7477@gmail.com	07249395351	21	232	new	17	hj9294712@gmail.com	2024-03-14 15:23:04.95707
208	abccsa	hemantjadhav7477@gmail.com	07249395351	21	234	suuuu	17	hj9294712@gmail.com	2024-03-14 15:23:04.966401
209	abccsa	hemantjadhav7477@gmail.com	07249395351	21	235	suuuu	17	hj9294712@gmail.com	2024-03-14 15:23:04.976792
210	hemant	jadhavhemantbalkrushna@gmail.com	+919021654411	16	240	uploads	17	jadhavhemantbalkrushna@gmail.com	2024-03-18 12:25:13.354502
211	abccsa	hemantjadhav7477@gmail.com	07249395351	21	230	new	17	hj9294712@gmail.com	2024-03-18 12:48:19.107868
212	abccsa	hemantjadhav7477@gmail.com	07249395351	21	234	suuuu	17	hj9294712@gmail.com	2024-03-18 12:48:19.190616
213	abccsa	hemantjadhav7477@gmail.com	07249395351	21	232	new	17	hj9294712@gmail.com	2024-03-18 12:48:19.200223
214	abccsa	hemantjadhav7477@gmail.com	07249395351	21	231	new	17	hj9294712@gmail.com	2024-03-18 12:48:19.225998
215	abccsa	hemantjadhav7477@gmail.com	07249395351	21	235	suuuu	17	hj9294712@gmail.com	2024-03-18 12:48:19.233533
216	abccsa	hemantjadhav7477@gmail.com	07249395351	21	233	suuuu	17	hj9294712@gmail.com	2024-03-18 12:48:19.237179
217	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	238	disabled 	17	hj9294712@gmail.com	2024-03-18 12:48:19.432644
218	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	239	const [file, setFile] = useState(null);	17	hj9294712@gmail.com	2024-03-18 12:48:19.535829
219	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	240	uploads	17	hj9294712@gmail.com	2024-03-18 12:48:19.53784
220	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	241	reactjs	\N	hj9294712@gmail.com	2024-03-18 12:51:33.789756
221	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	241	reactjs	16	hj9294712@gmail.com	2024-03-18 12:52:14.56103
222	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	241	reactjs	16	hj9294712@gmail.com	2024-03-18 12:52:46.89551
223	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	241	reactjs	16	hj9294712@gmail.com	2024-03-18 12:52:47.840722
224	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	241	reactjs	16	hj9294712@gmail.com	2024-03-18 12:54:13.723254
225	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	241	reactjs	16	hj9294712@gmail.com	2024-03-18 14:02:02.052006
226	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	242	NODE	16	hj9294712@gmail.com	2024-03-18 14:02:02.298325
227	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	243	NODE	16	hj9294712@gmail.com	2024-03-18 14:02:02.299839
228	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	244	NODE	16	hj9294712@gmail.com	2024-03-18 14:02:02.302039
229	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	245	NODE	16	hj9294712@gmail.com	2024-03-18 14:02:02.303126
230	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	246	NODE	16	hj9294712@gmail.com	2024-03-18 14:02:02.304445
231	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	247	NODE	16	hj9294712@gmail.com	2024-03-18 14:02:02.364856
232	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	248	NODE	16	hj9294712@gmail.com	2024-03-18 14:02:02.615486
233	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	249	NODE	16	hj9294712@gmail.com	2024-03-18 14:02:02.617168
234	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	250	NODE	16	hj9294712@gmail.com	2024-03-18 14:02:02.618729
235	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	251	NODE	16	hj9294712@gmail.com	2024-03-18 14:02:02.620012
236	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	252	NODE	16	hj9294712@gmail.com	2024-03-18 14:02:02.621682
237	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	242	NODE	16	hj9294712@gmail.com	2024-03-19 11:01:34.038124
238	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	245	NODE	16	hj9294712@gmail.com	2024-03-19 11:01:34.055906
239	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	244	NODE	16	hj9294712@gmail.com	2024-03-19 11:01:34.092377
240	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	246	NODE	16	hj9294712@gmail.com	2024-03-19 11:01:34.097617
241	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	243	NODE	16	hj9294712@gmail.com	2024-03-19 11:01:34.097199
242	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	241	reactjs	16	hj9294712@gmail.com	2024-03-19 11:01:34.100502
243	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	247	NODE	16	hj9294712@gmail.com	2024-03-19 11:01:34.372982
244	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	248	NODE	16	hj9294712@gmail.com	2024-03-19 11:01:34.375201
245	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	249	NODE	16	hj9294712@gmail.com	2024-03-19 11:01:34.405344
246	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	250	NODE	16	hj9294712@gmail.com	2024-03-19 11:01:34.41271
247	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	251	NODE	16	hj9294712@gmail.com	2024-03-19 11:01:34.413338
248	abccsa	jadhavhemantbalkrushna@gmail.com	07249395351	21	252	NODE	16	hj9294712@gmail.com	2024-03-19 11:01:34.414046
\.


--
-- TOC entry 4933 (class 0 OID 139458)
-- Dependencies: 226
-- Data for Name: member_interview_records; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.member_interview_records (id, interviewed_by, interview_assessment, interview_score, interview_video_link, opportunity_id, created_at) FROM stdin;
\.


--
-- TOC entry 4944 (class 0 OID 156582)
-- Dependencies: 237
-- Data for Name: membercategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.membercategory (categorycode, categoryname, categorydescription, id) FROM stdin;
code_value	name_value	description_value	1
C001	Category One	This is the description for Category One.	2
code_value	name_value	description_value	3
C001	Category One	This is the description for Category One.	4
code_value	name_value	description_value	5
C001	Category One	This is the description for Category One.	6
code_value	name_value	description_value	7
C001	Category One	This is the description for Category One.	8
code_value	name_value	description_value	9
C001	Category One	This is the description for Category One.	10
code_value	name_value	description_value	11
C001	Category One	This is the description for Category One.	12
code_value	name_value	description_value	13
C001	Category One	This is the description for Category One.	14
code_value	name_value	description_value	15
C001	Category One	This is the description for Category One.	16
code_value	name_value	description_value	17
C001	Category One	This is the description for Category One.	18
code_value	name_value	description_value	19
C001	Category One	This is the description for Category One.	20
code_value	name_value	description_value	21
C001	Category One	This is the description for Category One.	22
code_value	name_value	description_value	23
C001	Category One	This is the description for Category One.	24
\.


--
-- TOC entry 4942 (class 0 OID 156572)
-- Dependencies: 235
-- Data for Name: membergroupmaster; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.membergroupmaster (groupcode, groupname, groupdescription, id) FROM stdin;
your_groupcode_value	your_groupname_value	your_groupdescription_value	1
your_groupcode_value	your_groupname_value	your_groupdescription_value	2
your_groupcode_value	your_groupname_value	your_groupdescription_value	3
your_groupcode_value	your_groupname_value	your_groupdescription_value	4
your_groupcode_value	your_groupname_value	your_groupdescription_value	5
your_groupcode_value	your_groupname_value	your_groupdescription_value	6
your_groupcode_value	your_groupname_value	your_groupdescription_value	7
your_groupcode_value	your_groupname_value	your_groupdescription_value	8
your_groupcode_value	your_groupname_value	your_groupdescription_value	9
your_groupcode_value	your_groupname_value	your_groupdescription_value	10
your_groupcode_value	your_groupname_value	your_groupdescription_value	11
your_groupcode_value	your_groupname_value	your_groupdescription_value	12
your_groupcode_value	your_groupname_value	your_groupdescription_value	13
your_groupcode_value	your_groupname_value	your_groupdescription_value	14
your_groupcode_value	your_groupname_value	your_groupdescription_value	15
\.


--
-- TOC entry 4941 (class 0 OID 156559)
-- Dependencies: 234
-- Data for Name: members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.members (id, member_name, member_code, member_phone, member_email, member_password, date_of_registration, date_of_expire, photo_image, resume, id_card_proof, other_documents, geolocation, specialisation, address, city, state, pincode, technology, roll_number, class_member, discipline, membergroup, membercategory, membertype, id_student, organization_name, designation_role, country, interested_membership, interested_research, interested_startup, interested_investments, interested_mentoring, membership_duration, membership_frequency_renewal, membership_status, flag) FROM stdin;
21	abccsa	as445	07249395351	hj9294712@gmail.com	heman	2024-03-04	2024-06-02	doc.jpg	doc.jpg	doc.jpg	doc.jpg	Latitude: 18.5270272, Longitude: 73.8164736	bcs	asffff	pune	mh	411028	bcs	45	bcs	\N	your_groupname_value	Category One	Premium	\N	abc	asdd	India	t	f	t	f	t	90	\N	active	t
16	hemant	14521	+919021654411	jadhavhemantbalkrushna@gmail.com	12345	2024-03-01	2024-05-30	asd	ad	ad	ad	Latitude: 18.5925785, Longitude: 73.7183639	ad	hadapsar pune	pune	Maharashtra	411028	ad	1254	ad	ad	your_groupname_value	Category One	Regular	\N	asdas	sd	India	t	t	t	t	t	90	\N	active	t
\.


--
-- TOC entry 4927 (class 0 OID 123098)
-- Dependencies: 220
-- Data for Name: membership_record; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.membership_record (membership_record_id, member_id, membership_type, membership_category, membership_duration, membership_frequency_renewal, membership_status) FROM stdin;
96	10	Standard	Silver	3	month 	Inactive
\.


--
-- TOC entry 4943 (class 0 OID 156577)
-- Dependencies: 236
-- Data for Name: membertype; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.membertype (typecode, typename, typedescription, id) FROM stdin;
T001	Regular	Regular member type description	1
T002	Premium	Premium member type description	2
T003	Gold	Gold member type description	3
T001	Regular	Regular member type description	4
T002	Premium	Premium member type description	5
T003	Gold	Gold member type description	6
T001	Regular	Regular member type description	7
T002	Premium	Premium member type description	8
T003	Gold	Gold member type description	9
T001	Regular	Regular member type description	10
T002	Premium	Premium member type description	11
T003	Gold	Gold member type description	12
T001	Regular	Regular member type description	13
T002	Premium	Premium member type description	14
T003	Gold	Gold member type description	15
T001	Regular	Regular member type description	16
T002	Premium	Premium member type description	17
T003	Gold	Gold member type description	18
T001	Regular	Regular member type description	19
T002	Premium	Premium member type description	20
T003	Gold	Gold member type description	21
T001	Regular	Regular member type description	22
T002	Premium	Premium member type description	23
T003	Gold	Gold member type description	24
T001	Regular	Regular member type description	25
T002	Premium	Premium member type description	26
T003	Gold	Gold member type description	27
T001	Regular	Regular member type description	28
T002	Premium	Premium member type description	29
T003	Gold	Gold member type description	30
T001	Regular	Regular member type description	31
T002	Premium	Premium member type description	32
T003	Gold	Gold member type description	33
T001	Regular	Regular member type description	34
T002	Premium	Premium member type description	35
T003	Gold	Gold member type description	36
T001	Regular	Regular member type description	37
T002	Premium	Premium member type description	38
T003	Gold	Gold member type description	39
T001	Regular	Regular member type description	40
T002	Premium	Premium member type description	41
T003	Gold	Gold member type description	42
T001	Regular	Regular member type description	43
T002	Premium	Premium member type description	44
T003	Gold	Gold member type description	45
T001	Regular	Regular member type description	46
T002	Premium	Premium member type description	47
T003	Gold	Gold member type description	48
T001	Regular	Regular member type description	49
T002	Premium	Premium member type description	50
T003	Gold	Gold member type description	51
T001	Regular	Regular member type description	52
T002	Premium	Premium member type description	53
T003	Gold	Gold member type description	54
T001	Regular	Regular member type description	55
T002	Premium	Premium member type description	56
T003	Gold	Gold member type description	57
T001	Regular	Regular member type description	58
T002	Premium	Premium member type description	59
T003	Gold	Gold member type description	60
T001	Regular	Regular member type description	61
T002	Premium	Premium member type description	62
T003	Gold	Gold member type description	63
T001	Regular	Regular member type description	64
T002	Premium	Premium member type description	65
T003	Gold	Gold member type description	66
T001	Regular	Regular member type description	67
T002	Premium	Premium member type description	68
T003	Gold	Gold member type description	69
T001	Regular	Regular member type description	70
T002	Premium	Premium member type description	71
T003	Gold	Gold member type description	72
T001	Regular	Regular member type description	73
T002	Premium	Premium member type description	74
T003	Gold	Gold member type description	75
T001	Regular	Regular member type description	76
T002	Premium	Premium member type description	77
T003	Gold	Gold member type description	78
T001	Regular	Regular member type description	79
T002	Premium	Premium member type description	80
T003	Gold	Gold member type description	81
T001	Regular	Regular member type description	82
T002	Premium	Premium member type description	83
T003	Gold	Gold member type description	84
T001	Regular	Regular member type description	85
T002	Premium	Premium member type description	86
T003	Gold	Gold member type description	87
T001	Regular	Regular member type description	88
T002	Premium	Premium member type description	89
T003	Gold	Gold member type description	90
T001	Regular	Regular member type description	91
T002	Premium	Premium member type description	92
T003	Gold	Gold member type description	93
T001	Regular	Regular member type description	94
T002	Premium	Premium member type description	95
T003	Gold	Gold member type description	96
T001	Regular	Regular member type description	97
T002	Premium	Premium member type description	98
T003	Gold	Gold member type description	99
T001	Regular	Regular member type description	100
T002	Premium	Premium member type description	101
T003	Gold	Gold member type description	102
\.


--
-- TOC entry 4929 (class 0 OID 131257)
-- Dependencies: 222
-- Data for Name: opportunities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.opportunities (id, opportunity_name, opportunity_description, opportunity_provider, opportunity_start_date, opportunity_end_date, opportunity_problem_statement, opportunity_expected_solution, opportunity_expected_work_zone, opportunity_expected_work_time, opportunity_work_type, opportunity_budget_available, opportunity_estimate_budget, budget_currency, opportunity_resource_volume, opportunity_status, opportunity_code, revised_volume, revised_budget, create_date, opportunity_type_id, flag, email, member_id, file_upload, photos) FROM stdin;
241	reactjs	fresher	hemant	2024-02-29	2024-03-15	ui development 	js	pune	on time	full time	true	45800	USD	45	inactive	445565	45812	444	2024-03-18	1	\N	jadhavhemantbalkrushna@gmail.com	16	hello.pdf	1710746460105-dekler-ph-_rRGqHO_BP4-unsplash.jpg
242	NODE	node	hemant	2024-03-19	2024-04-07	node.js	node.js	home	full time	node.js	true	45	EUR	45	Active	45	45	45	2024-03-18	1	\N	jadhavhemantbalkrushna@gmail.com	16	node.png	1710750688884-pexels-derwin-edwards-11209235.jpg
243	NODE	node	hemant	2024-03-19	2024-04-07	node.js	node.js	home	full time	node.js	true	45	EUR	45	Active	45	45	45	2024-03-18	1	\N	jadhavhemantbalkrushna@gmail.com	16	node.png	1710750692950-pexels-derwin-edwards-11209235.jpg
244	NODE	node	hemant	2024-03-19	2024-04-07	node.js	node.js	home	full time	node.js	true	45	EUR	45	Active	45	45	45	2024-03-18	1	\N	jadhavhemantbalkrushna@gmail.com	16	node.png	1710750693888-pexels-derwin-edwards-11209235.jpg
245	NODE	node	hemant	2024-03-19	2024-04-07	node.js	node.js	home	full time	node.js	true	45	EUR	45	Active	45	45	45	2024-03-18	1	\N	jadhavhemantbalkrushna@gmail.com	16	node.png	1710750694517-pexels-derwin-edwards-11209235.jpg
246	NODE	node	hemant	2024-03-19	2024-04-07	node.js	node.js	home	full time	node.js	true	45	EUR	45	Active	45	45	45	2024-03-18	1	\N	jadhavhemantbalkrushna@gmail.com	16	node.png	1710750695399-pexels-derwin-edwards-11209235.jpg
247	NODE	node	hemant	2024-03-19	2024-04-07	node.js	node.js	home	full time	node.js	true	45	EUR	45	Active	45	45	45	2024-03-18	1	\N	jadhavhemantbalkrushna@gmail.com	16	node.png	1710750695949-pexels-derwin-edwards-11209235.jpg
248	NODE	node	hemant	2024-03-19	2024-04-07	node.js	node.js	home	full time	node.js	true	45	EUR	45	Active	45	45	45	2024-03-18	1	\N	jadhavhemantbalkrushna@gmail.com	16	node.png	1710750696348-pexels-derwin-edwards-11209235.jpg
249	NODE	node	hemant	2024-03-19	2024-04-07	node.js	node.js	home	full time	node.js	true	45	EUR	45	Active	45	45	45	2024-03-18	1	\N	jadhavhemantbalkrushna@gmail.com	16	node.png	1710750696648-pexels-derwin-edwards-11209235.jpg
250	NODE	node	hemant	2024-03-19	2024-04-07	node.js	node.js	home	full time	node.js	true	45	EUR	45	Active	45	45	45	2024-03-18	1	\N	jadhavhemantbalkrushna@gmail.com	16	node.png	1710750696952-pexels-derwin-edwards-11209235.jpg
251	NODE	node	hemant	2024-03-19	2024-04-07	node.js	node.js	home	full time	node.js	true	45	EUR	45	Active	45	45	45	2024-03-18	1	\N	jadhavhemantbalkrushna@gmail.com	16	node.png	1710750697204-pexels-derwin-edwards-11209235.jpg
252	NODE	node	hemant	2024-03-19	2024-04-07	node.js	node.js	home	full time	node.js	true	45	EUR	45	Active	45	45	45	2024-03-18	1	\N	jadhavhemantbalkrushna@gmail.com	16	node.png	1710750697451-pexels-derwin-edwards-11209235.jpg
\.


--
-- TOC entry 4952 (class 0 OID 156691)
-- Dependencies: 245
-- Data for Name: opportunities_with_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.opportunities_with_types (opportunity_type, opportunity_names, opportunity_ids) FROM stdin;
Type C	{ashehagshgf}	{222}
hii	{"Opportunity 4","Opportunity 4","Opportunity 4","Opportunity 4","Opportunity 4","Opportunity 4","Opportunity 4","Opportunity 4"}	{221,220,219,218,217,216,215,214}
heman	{hemant,ashehagshgf}	{224,223}
asadsada	{"Opportunity 4","Opportunity 4","Opportunity 4","Opportunity 4","Opportunity 4","Opportunity 4","Opportunity 4","Opportunity 4","Opportunity 4","Opportunity 4","Opportunity 4","Opportunity 4","Opportunity 4"}	{213,212,211,210,209,208,207,206,205,204,203,202,201}
 xxxxxxxxxxxxxxxxxxxxxxxxxxx	{asfdsafdasfsahermsnbmnnv,asfdsafdasfsahermsnbmnnv}	{225,226}
\.


--
-- TOC entry 4931 (class 0 OID 131266)
-- Dependencies: 224
-- Data for Name: opportunity_allocation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.opportunity_allocation (id, opportunity_id, opportunity_allocated_by, opportunity_allocated_to, opportunity_for, opportunity_allocation_date, opportunity_allocation_status, opportunity_allocation_remark, opportunity_details_doc, memberrole) FROM stdin;
19	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
20	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
21	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
22	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
23	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
24	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
25	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
26	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
27	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
28	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
29	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
30	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
31	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
32	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
33	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
34	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
35	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
36	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
37	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
38	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
39	2	Alice Johnson	Bob Williams	Project Y	2024-02-04	Pending	Awaiting approval for resource allocation	opportunity456.docx	Project Manager
\.


--
-- TOC entry 4951 (class 0 OID 156628)
-- Dependencies: 244
-- Data for Name: opportunity_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.opportunity_types (id, opportunity_type) FROM stdin;
1	Type A
2	Type B
3	Type C
4	Type D
5	Type E
6	gfdgf
7	gjh
8	hello
9	hello
10	hii
11	asadsada
12	asddasdfsfsadasf
13	asda
14	hae
15	sdafasdfasd
16	 xxxxxxxxxxxxxxxxxxxxxxxxxxx
17	sajajlds
18	heman
19	asdasas
20	asdfcsad
21	new
\.


--
-- TOC entry 4956 (class 0 OID 156733)
-- Dependencies: 249
-- Data for Name: refre_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.refre_members (id, name, srnumber, referencename, college, discipline, cla_ss, rollnumber, referenceemail, referencephone, membre_id) FROM stdin;
1	John Doe	SR123	Jane Smith	ABC College	Computer Science	Class A	A123	jane@example.com	1234567890	101
2	Alice Johnson	SR456	Bob Brown	XYZ University	Electrical Engineering	Class B	B456	bob@example.com	9876543210	102
3	Emily Wang	SR789	David Lee	PQR Institute	Mechanical Engineering	Class C	C789	david@example.com	5555555555	103
4	John Doe	SR123	Jane Smith	ABC College	Computer Science	Class A	A123	jane@example.com	1234567890	101
5	Alice Johnson	SR456	Bob Brown	XYZ University	Electrical Engineering	Class B	B456	bob@example.com	9876543210	102
6	Emily Wang	SR789	David Lee	PQR Institute	Mechanical Engineering	Class C	C789	david@example.com	5555555555	103
7	John Doe	SR123	Jane Smith	ABC College	Computer Science	Class A	A123	jane@example.com	1234567890	101
8	Alice Johnson	SR456	Bob Brown	XYZ University	Electrical Engineering	Class B	B456	bob@example.com	9876543210	102
9	Emily Wang	SR789	David Lee	PQR Institute	Mechanical Engineering	Class C	C789	david@example.com	5555555555	103
10	John Doe	SR123	Jane Smith	ABC College	Computer Science	Class A	A123	jane@example.com	1234567890	101
11	Alice Johnson	SR456	Bob Brown	XYZ University	Electrical Engineering	Class B	B456	bob@example.com	9876543210	102
12	Emily Wang	SR789	David Lee	PQR Institute	Mechanical Engineering	Class C	C789	david@example.com	5555555555	103
13	lkasdhlgv	lkasdhlgv	lkasdhlgv	lkasdhlgv	lkasdhlgv	lkasdhlgv	45	lkasdhlgv	4545445785	\N
14	userId	userId	userId	userId	userId	userId	userId	userId	5456465	\N
15	userId	userId	userId	userId	userId	userId	userId	userId	userId	\N
16	membre_id	membre_id	membre_id	membre_id	membre_id	membre_id	145	membre_id	418545152	16
\.


--
-- TOC entry 4925 (class 0 OID 114857)
-- Dependencies: 218
-- Data for Name: research_refrence_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.research_refrence_table (id, name, srnumber, referencename, college, discipline, cla_ss, rollnumber, referenceemail, referencephone) FROM stdin;
\.


--
-- TOC entry 4939 (class 0 OID 156541)
-- Dependencies: 232
-- Data for Name: research_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.research_table (id, name, designation, organization, phone_no, email, discipline, research_topic, research_category, sub_research_category, methodology, abstract, expected_outcome, file_upload, submit_date, city, state, country, validupto_date, interested_membership, interested_in_startup, flag) FROM stdin;
18	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
9	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
20	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
17	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
2	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
16	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
24	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
14	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
11	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
5	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
15	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
30	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-11	New York	New York	USA	2024-02-15	t	\N	f
27	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-16	New York	New York	USA	2024-02-16	f	f	f
6	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
36	somnath Londhe	moment	moment	+919021654411	jadhavhemantbalkrushna@gmail.com	moment	moment	moment	moment	moment	moment	moment	moment	2024-02-16	pune	Maharashtra	India	2024-02-23	t	t	f
29	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-12	New York	New York	USA	2024-02-19	t	f	f
23	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
28	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-12	New York	New York	USA	2024-02-19	f	f	f
4	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
37	somnath Londhe	moment	moment	+919021654411	jadhavhemantbalkrushna@gmail.com	moment	moment	moment	moment	moment	moment	moment	moment	2024-02-16	pune	Maharashtra	India	2024-05-16	t	t	f
26	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-16	New York	New York	USA	2024-02-16	f	f	f
39	somnath Londhe	moment	moment	+919021654411	jadhavhemantbalkrushna@gmail.com	moment	moment	moment	moment	moment	moment	moment	moment	2024-02-16	pune	Maharashtra	India	2024-05-16	t	t	f
38	somnath Londhe	moment	moment	+919021654411	jadhavhemantbalkrushna@gmail.com	moment	moment	moment	moment	moment	moment	moment	moment	2024-02-16	pune	Maharashtra	India	2024-05-16	t	t	f
32	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-16	New York	New York	USA	2024-02-15	f	f	f
10	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
35	somnath Londhe	moment	moment	+919021654411	jadhavhemantbalkrushna@gmail.com	moment	moment	moment	moment	moment	moment	moment	moment	2024-02-16	pune	Maharashtra	India	2024-02-23	t	t	f
12	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
34	somnath Londhe	moment	moment	+919021654411	jadhavhemantbalkrushna@gmail.com	moment	moment	moment	moment	moment	moment	moment	moment	2024-02-16	pune	Maharashtra	India	2024-02-23	t	t	f
33	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-16	New York	New York	USA	2024-02-17	t	f	f
3	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
19	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
22	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
21	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
31	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-16	New York	New York	USA	2024-02-15	f	\N	f
13	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
7	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
8	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
1	John Doe	Researcher	XYZ University	+1234567890	john.doe@example.com	Computer Science	Machine Learning	Academic Research	Supervised Learning	Statistical analysis	This is the abstract of the research topic.	Expected outcomes of the research.	research_file.pdf	2024-02-13	New York	New York	USA	2024-08-13	t	f	f
\.


--
-- TOC entry 4958 (class 0 OID 156742)
-- Dependencies: 251
-- Data for Name: resourcemaster; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.resourcemaster (resourceid, resourcename, designation, status, empcode, fromdate, todate) FROM stdin;
1	John Doe	Engineer	Active	E123	2024-02-13	2025-02-13
2	John Doe	Engineer	Active	E123	2024-02-13	2025-02-13
3	Jane Smith	Manager	Active	E124	2023-08-15	2024-08-15
4	Alice Johnson	Developer	Inactive	E125	2022-10-20	2023-12-31
5	Bob Anderson	Designer	Active	E126	2023-05-01	2024-05-01
6	John Doe	Engineer	Active	E123	2024-02-13	2025-02-13
7	Jane Smith	Manager	Active	E124	2023-08-15	2024-08-15
8	Alice Johnson	Developer	Inactive	E125	2022-10-20	2023-12-31
9	Bob Anderson	Designer	Active	E126	2023-05-01	2024-05-01
10	John Doe	Engineer	Active	E123	2024-02-13	2025-02-13
11	Jane Smith	Manager	Active	E124	2023-08-15	2024-08-15
12	Alice Johnson	Developer	Inactive	E125	2022-10-20	2023-12-31
13	Bob Anderson	Designer	Active	E126	2023-05-01	2024-05-01
14	John Doe	Engineer	Active	E123	2024-02-13	2025-02-13
15	Jane Smith	Manager	Active	E124	2023-08-15	2024-08-15
16	Alice Johnson	Developer	Inactive	E125	2022-10-20	2023-12-31
17	Bob Anderson	Designer	Active	E126	2023-05-01	2024-05-01
18	John Doe	Engineer	Active	E123	2024-02-13	2025-02-13
19	Jane Smith	Manager	Active	E124	2023-08-15	2024-08-15
20	Alice Johnson	Developer	Inactive	E125	2022-10-20	2023-12-31
21	Bob Anderson	Designer	Active	E126	2023-05-01	2024-05-01
22	John Doe	Engineer	Active	E123	2024-02-13	2025-02-13
23	Jane Smith	Manager	Active	E124	2023-08-15	2024-08-15
24	Alice Johnson	Developer	Inactive	E125	2022-10-20	2023-12-31
25	Bob Anderson	Designer	Active	E126	2023-05-01	2024-05-01
26	John Doe	Engineer	Active	E123	2024-02-13	2025-02-13
27	Jane Smith	Manager	Active	E124	2023-08-15	2024-08-15
28	Alice Johnson	Developer	Inactive	E125	2022-10-20	2023-12-31
29	Bob Anderson	Designer	Active	E126	2023-05-01	2024-05-01
30	John Doe	Engineer	Active	E123	2024-02-13	2025-02-13
31	Jane Smith	Manager	Active	E124	2023-08-15	2024-08-15
32	Alice Johnson	Developer	Inactive	E125	2022-10-20	2023-12-31
33	Bob Anderson	Designer	Active	E126	2023-05-01	2024-05-01
34	John Doe	Engineer	Active	E123	2024-02-13	2025-02-13
35	Jane Smith	Manager	Active	E124	2023-08-15	2024-08-15
36	Alice Johnson	Developer	Inactive	E125	2022-10-20	2023-12-31
37	Bob Anderson	Designer	Active	E126	2023-05-01	2024-05-01
\.


--
-- TOC entry 4954 (class 0 OID 156708)
-- Dependencies: 247
-- Data for Name: selection_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.selection_table (id, applicant_name, phonenumber, selection_status, flag, opportunity_name, opportunity_id, status, memberid) FROM stdin;
64	abccsa	07249395351	\N	t	reactjs	221	\N	16
70	abccsa	07249395351	No	f	NODE	246	\N	16
66	abccsa	07249395351	\N	f	reactjs	223	\N	16
67	abccsa	07249395351	yes	f	reactjs	224	\N	16
68	abccsa	07249395351	No	f	NODE	248	\N	16
69	abccsa	07249395351	No	f	NODE	247	\N	16
65	abccsa	07249395351	\N	f	reactjs	222	\N	16
54	hemant	+919021654411	yes	t	suuuu	107	\N	16
55	hemant	+919021654411	yes	t	suuuu	107	\N	16
56	hemant	+919021654411	yes	t	new	109	\N	16
57	hemant	+919021654411	yes	t	suuuu	110	\N	16
58	hemant	+919021654411	yes	t	new	112	\N	16
59	hemant	+919021654411	yes	t	new	113	\N	16
60	hemant	+919021654411	yes	t	new	114	\N	16
61	hemant	+919021654411	yes	t	suuuu	115	\N	16
62	hemant	+919021654411	yes	t	suuuu	116	\N	16
63	hemant	+919021654411	yes	t	suuuu	117	\N	16
\.


--
-- TOC entry 4937 (class 0 OID 156531)
-- Dependencies: 230
-- Data for Name: student_ideation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student_ideation (id, student_name, student_class, student_roll_number, student_phone_no, email_id, student_college, description, problem_statement, solution, technology_inract, github_link, power_point_document, da_te_submited, discipline, city, s_state, country, interested_in_membership, interested_in_startup, membervaliddate, flag) FROM stdin;
120	rohit	12	1122	7219780777	rm8912898@gmail.com	computer science	xjfsdkbv sdv	sjdfklsfd	sajkcf	dgrfv	asdsa.com	asdsa.com	2024-03-11	dfdg	pune	maharastra	india	false	Yes	2024-03-18	f
116	hemant	Grade 12	2023001	123-456-7890	john.doe@example.com	ABC College	This project aims to...	The problem we are addressing is...	Our solution involves...	Technologies used include...	https://github.com/johndoe/project	https://example.com/powerpoint.pptx	2024-02-13	Computer Science	New York City	New York	USA	Yes	No	2024-02-14	f
\.


--
-- TOC entry 4923 (class 0 OID 98481)
-- Dependencies: 216
-- Data for Name: student_refrence_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student_refrence_table (id, name, srnumber, referencename, college, discipline, cla_ss, rollnumber, referenceemail, referencephone) FROM stdin;
\.


--
-- TOC entry 4980 (class 0 OID 0)
-- Dependencies: 227
-- Name: ecosystems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ecosystems_id_seq', 117, true);


--
-- TOC entry 4981 (class 0 OID 0)
-- Dependencies: 241
-- Name: interested_people_table_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.interested_people_table_id_seq', 248, true);


--
-- TOC entry 4982 (class 0 OID 0)
-- Dependencies: 225
-- Name: member_interview_records_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.member_interview_records_id_seq', 35, true);


--
-- TOC entry 4983 (class 0 OID 0)
-- Dependencies: 240
-- Name: membercategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.membercategory_id_seq', 24, true);


--
-- TOC entry 4984 (class 0 OID 0)
-- Dependencies: 238
-- Name: membergroupmaster_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.membergroupmaster_id_seq', 15, true);


--
-- TOC entry 4985 (class 0 OID 0)
-- Dependencies: 233
-- Name: members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.members_id_seq', 21, true);


--
-- TOC entry 4986 (class 0 OID 0)
-- Dependencies: 219
-- Name: membership_record_membership_record_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.membership_record_membership_record_id_seq', 96, true);


--
-- TOC entry 4987 (class 0 OID 0)
-- Dependencies: 239
-- Name: membertype_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.membertype_id_seq', 102, true);


--
-- TOC entry 4988 (class 0 OID 0)
-- Dependencies: 221
-- Name: opportunities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.opportunities_id_seq', 252, true);


--
-- TOC entry 4989 (class 0 OID 0)
-- Dependencies: 223
-- Name: opportunity_allocation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.opportunity_allocation_id_seq', 40, true);


--
-- TOC entry 4990 (class 0 OID 0)
-- Dependencies: 243
-- Name: opportunity_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.opportunity_types_id_seq', 21, true);


--
-- TOC entry 4991 (class 0 OID 0)
-- Dependencies: 248
-- Name: refre_members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.refre_members_id_seq', 16, true);


--
-- TOC entry 4992 (class 0 OID 0)
-- Dependencies: 217
-- Name: research_refrence_table_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.research_refrence_table_id_seq', 49, true);


--
-- TOC entry 4993 (class 0 OID 0)
-- Dependencies: 231
-- Name: research_table_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.research_table_id_seq', 39, true);


--
-- TOC entry 4994 (class 0 OID 0)
-- Dependencies: 250
-- Name: resourcemaster_resourceid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.resourcemaster_resourceid_seq', 37, true);


--
-- TOC entry 4995 (class 0 OID 0)
-- Dependencies: 246
-- Name: selection_table_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.selection_table_id_seq', 70, true);


--
-- TOC entry 4996 (class 0 OID 0)
-- Dependencies: 229
-- Name: student_ideation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.student_ideation_id_seq', 120, true);


--
-- TOC entry 4997 (class 0 OID 0)
-- Dependencies: 215
-- Name: student_refrence_table_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.student_refrence_table_id_seq', 5, true);


--
-- TOC entry 4754 (class 2606 OID 156511)
-- Name: ecosystems ecosystems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ecosystems
    ADD CONSTRAINT ecosystems_pkey PRIMARY KEY (id);


--
-- TOC entry 4768 (class 2606 OID 156626)
-- Name: interested_people_table interested_people_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interested_people_table
    ADD CONSTRAINT interested_people_table_pkey PRIMARY KEY (id);


--
-- TOC entry 4752 (class 2606 OID 139466)
-- Name: member_interview_records member_interview_records_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member_interview_records
    ADD CONSTRAINT member_interview_records_pkey PRIMARY KEY (id);


--
-- TOC entry 4766 (class 2606 OID 156611)
-- Name: membercategory membercategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membercategory
    ADD CONSTRAINT membercategory_pkey PRIMARY KEY (id);


--
-- TOC entry 4762 (class 2606 OID 156591)
-- Name: membergroupmaster membergroupmaster_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membergroupmaster
    ADD CONSTRAINT membergroupmaster_pkey PRIMARY KEY (id);


--
-- TOC entry 4760 (class 2606 OID 156566)
-- Name: members members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);


--
-- TOC entry 4746 (class 2606 OID 123105)
-- Name: membership_record membership_record_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership_record
    ADD CONSTRAINT membership_record_pkey PRIMARY KEY (membership_record_id);


--
-- TOC entry 4764 (class 2606 OID 156601)
-- Name: membertype membertype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membertype
    ADD CONSTRAINT membertype_pkey PRIMARY KEY (id);


--
-- TOC entry 4748 (class 2606 OID 131264)
-- Name: opportunities opportunities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opportunities
    ADD CONSTRAINT opportunities_pkey PRIMARY KEY (id);


--
-- TOC entry 4750 (class 2606 OID 131273)
-- Name: opportunity_allocation opportunity_allocation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opportunity_allocation
    ADD CONSTRAINT opportunity_allocation_pkey PRIMARY KEY (id);


--
-- TOC entry 4770 (class 2606 OID 156633)
-- Name: opportunity_types opportunity_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opportunity_types
    ADD CONSTRAINT opportunity_types_pkey PRIMARY KEY (id);


--
-- TOC entry 4774 (class 2606 OID 156740)
-- Name: refre_members refre_members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refre_members
    ADD CONSTRAINT refre_members_pkey PRIMARY KEY (id);


--
-- TOC entry 4744 (class 2606 OID 114863)
-- Name: research_refrence_table research_refrence_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.research_refrence_table
    ADD CONSTRAINT research_refrence_table_pkey PRIMARY KEY (id);


--
-- TOC entry 4758 (class 2606 OID 156548)
-- Name: research_table research_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.research_table
    ADD CONSTRAINT research_table_pkey PRIMARY KEY (id);


--
-- TOC entry 4776 (class 2606 OID 156749)
-- Name: resourcemaster resourcemaster_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resourcemaster
    ADD CONSTRAINT resourcemaster_pkey PRIMARY KEY (resourceid);


--
-- TOC entry 4772 (class 2606 OID 156715)
-- Name: selection_table selection_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.selection_table
    ADD CONSTRAINT selection_table_pkey PRIMARY KEY (id);


--
-- TOC entry 4756 (class 2606 OID 156538)
-- Name: student_ideation student_ideation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_ideation
    ADD CONSTRAINT student_ideation_pkey PRIMARY KEY (id);


--
-- TOC entry 4742 (class 2606 OID 98487)
-- Name: student_refrence_table student_refrence_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_refrence_table
    ADD CONSTRAINT student_refrence_table_pkey PRIMARY KEY (id);


--
-- TOC entry 4778 (class 2606 OID 139467)
-- Name: member_interview_records member_interview_records_opportunity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member_interview_records
    ADD CONSTRAINT member_interview_records_opportunity_id_fkey FOREIGN KEY (opportunity_id) REFERENCES public.opportunities(id);


--
-- TOC entry 4777 (class 2606 OID 156634)
-- Name: opportunities opportunities_opportunity_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opportunities
    ADD CONSTRAINT opportunities_opportunity_type_id_fkey FOREIGN KEY (opportunity_type_id) REFERENCES public.opportunity_types(id);


-- Completed on 2024-03-19 14:56:17

--
-- PostgreSQL database dump complete
--

