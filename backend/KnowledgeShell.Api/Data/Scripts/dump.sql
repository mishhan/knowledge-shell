--
-- PostgreSQL database dump
--

-- Dumped from database version 10.6
-- Dumped by pg_dump version 10.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: knowledge_shell; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE knowledge_shell WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';


ALTER DATABASE knowledge_shell OWNER TO postgres;

\connect knowledge_shell

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."__EFMigrationsHistory" (
    migration_id character varying(150) NOT NULL,
    product_version character varying(32) NOT NULL
);


ALTER TABLE public."__EFMigrationsHistory" OWNER TO postgres;

--
-- Name: domain_values; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.domain_values (
    id uuid NOT NULL,
    domain_id uuid NOT NULL,
    discriminator text NOT NULL,
    value_id uuid,
    value text,
    "order" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.domain_values OWNER TO postgres;

--
-- Name: domains; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.domains (
    id uuid NOT NULL,
    name text,
    is_read_only boolean DEFAULT false NOT NULL,
    frame_base_id uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL
);


ALTER TABLE public.domains OWNER TO postgres;

--
-- Name: frame_bases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.frame_bases (
    id uuid NOT NULL,
    name text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.frame_bases OWNER TO postgres;

--
-- Name: frames; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.frames (
    id uuid NOT NULL,
    name text,
    position_id uuid NOT NULL,
    parent_id uuid,
    frame_base_id uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL
);


ALTER TABLE public.frames OWNER TO postgres;

--
-- Name: positions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.positions (
    id uuid NOT NULL,
    x double precision NOT NULL,
    y double precision NOT NULL
);


ALTER TABLE public.positions OWNER TO postgres;

--
-- Name: productions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productions (
    id uuid NOT NULL,
    text text,
    slot_id uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL
);


ALTER TABLE public.productions OWNER TO postgres;

--
-- Name: slots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.slots (
    id uuid NOT NULL,
    name text,
    is_inherited boolean NOT NULL,
    owner_id uuid NOT NULL,
    parent_id uuid,
    domain_id uuid,
    value_id uuid,
    "order" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.slots OWNER TO postgres;

--
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."__EFMigrationsHistory" (migration_id, product_version) FROM stdin;
20200701100547_Initial	3.1.5
20200703140804_DomainReadOnlyAndSeed	3.1.5
20200715163053_AddModelRelations	3.1.5
20200716130901_SlotFksNonUnique	3.1.5
20200717113258_SlotRelationChanged	3.1.6
20200718114049_SlotProductionRelationUpdated	3.1.6
20200727122747_SlotCreatedAt	3.1.6
20200730152022_DomainValueOrder	3.1.6
20200902150233_AddOrderFieldToSlot	3.1.7
20200905122134_AddFrameBaseEntity	3.1.7
\.


--
-- Data for Name: domain_values; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.domain_values (id, domain_id, discriminator, value_id, value, "order") FROM stdin;
e4ee09bd-e5e6-47d2-96cf-b23b5a2ce0c3	75544b8f-0248-45d4-b77e-3622686b2bc9	DomainValueString	\N	1	0
20901781-44bf-4571-9886-96826c847d5f	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	5b3a2dfb-dcb1-45fb-8921-40f44e759754	\N	0
575b482a-6a81-42d6-83ec-03eeaa93c9f2	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	f1202893-3507-4d5f-838c-4aacfbe616da	\N	0
558fd008-34eb-441c-9604-d6dcfb9c839a	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	33158b80-8545-4c1e-8c6d-c94694106161	\N	0
0af4bb53-e137-46d7-b2ad-ce3df2eedb5a	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	4cbe9761-6894-43df-9794-1fbd03802ca5	\N	0
bac389e1-65b1-4b53-94ec-8dff035617ef	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	3bec3d4a-7716-4308-b7e3-69308c70994a	\N	0
2e606c16-d5e6-4e60-adaf-ef6d6a2a2981	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	92c27b44-a319-462b-9994-fbab3782c1e0	\N	0
125aaabf-acd5-42ff-9359-6e63533854a1	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	8fca3b12-bcc0-49b7-a5e0-fcd0429bd417	\N	0
c6051ec2-c662-4b05-9526-64a2be30a3bf	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	120de4fd-defd-4575-84a3-94507ee6b3ac	\N	0
18e4052a-0f06-47a8-885e-65e620fc3dce	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	1ee6703e-add7-440b-9852-dd019782cc1e	\N	0
96ee3767-d98f-4632-8a0a-3867e6fabe18	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	7beb8b44-0e70-4b33-98af-a9a827c6ff7f	\N	0
68f45726-e81c-4036-82ae-f233ffcb3937	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	ef3f9bb0-6c4c-4c94-9f4b-2513f2669d7f	\N	0
4578b81e-f754-498e-9d71-b5131535c6d1	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	2962fbc1-147c-4049-b8c4-e044cfa8a671	\N	0
cdaac813-8258-48b0-a2bd-e2d63b9c0d4c	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	16610855-bc0f-4c5b-9cc0-822104ba5246	\N	0
ef3a30f8-4bf4-475b-8a23-077ad63b7152	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	3c864766-2f6a-4545-8cff-060413d22cd0	\N	0
6e8e72eb-1fd0-48eb-9246-12e2474c3471	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	DomainValueString	\N	0	0
ba107075-aefa-4e17-9168-b835aee60a7a	41b08c0c-ae32-4589-9272-a9e33477879a	DomainValueString	\N	0	0
ff23de2b-1927-471a-b020-b91e7b3fb1eb	36e69d89-acb0-4579-ac98-4571f28c407c	DomainValueString	\N	0	0
076159c1-43bd-4e25-b251-3285637d87ba	7601554e-1721-4775-a136-25710f4abe65	DomainValueString	\N	White	0
7db6dbcc-814e-488f-b277-dcf0bd39b422	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	8cba83f7-dd30-4a7e-80bd-e959c269ab05	\N	0
076f099e-2bfc-4637-98b4-d6e04000cc07	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	f42602c6-3946-4a8f-abe3-091fbad526e7	\N	0
91da8da3-e7a0-423d-beed-09baa878966c	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	712b1247-d47e-47ab-a89c-d2730b01c884	\N	0
500ae894-c5fd-47f9-92a8-837942f8eda3	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	7d9d6812-63d9-44ea-a429-03ef61dacb3d	\N	0
899747fa-6189-4e6f-aab7-13f0dee0061f	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	3618f087-0918-4cc7-9a01-8a82a4906b4c	\N	0
c47fe03b-c048-46d0-b778-3d1ea21b0b9d	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	d255a782-9a81-4341-9d07-51e761f130af	\N	0
49eba104-7a21-46ad-b47d-da1d28c066a7	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	0
1db4cd7d-8406-4200-a2dc-59b9b957adb9	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	8065a1ff-bca0-42c1-bbda-187bc952c06e	\N	0
c5fe043e-a856-40b2-b5dd-0a4fdcac3a0f	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	63f25dd2-c3e4-4429-abfb-643b4c7165c2	\N	0
431656c1-6a08-425d-856c-570e7c81da39	b03c6bb0-6fdd-4fbb-a919-37c4ee2625f7	DomainValueString	\N	white_witch.png	0
ad032b4f-c3e5-43cb-9978-cd32619a198f	b03c6bb0-6fdd-4fbb-a919-37c4ee2625f7	DomainValueString	\N	white_warrior.png	1
2f0af187-e21e-421f-8729-9a363f72756a	b03c6bb0-6fdd-4fbb-a919-37c4ee2625f7	DomainValueString	\N	red_witch.png	2
82e2ab48-1fdd-4ba0-a039-81c201199774	b03c6bb0-6fdd-4fbb-a919-37c4ee2625f7	DomainValueString	\N	red_warrior.png	3
34e46adc-214c-4b2c-8bc3-03d55f741db1	41b08c0c-ae32-4589-9272-a9e33477879a	DomainValueString	\N	1	1
9a43d981-791b-48f5-ae62-ae1387223763	41b08c0c-ae32-4589-9272-a9e33477879a	DomainValueString	\N	2	2
abab0e6d-a479-4726-bae5-dd647c767b62	41b08c0c-ae32-4589-9272-a9e33477879a	DomainValueString	\N	3	3
3d0069be-f580-4208-9690-275b5e05d457	7601554e-1721-4775-a136-25710f4abe65	DomainValueString	\N	Red	1
4ef27dd0-2a5c-4fc1-b9f5-333ed6840284	75544b8f-0248-45d4-b77e-3622686b2bc9	DomainValueString	\N	2	1
8eb5b7cf-e7e6-4903-9505-54a63b5f7e79	36e69d89-acb0-4579-ac98-4571f28c407c	DomainValueString	\N	1	1
65bfc4ac-84bf-4b6c-b9d1-614a1aaf5b03	36e69d89-acb0-4579-ac98-4571f28c407c	DomainValueString	\N	2	2
3a8637e3-6f64-43a5-a235-652f17352e4f	36e69d89-acb0-4579-ac98-4571f28c407c	DomainValueString	\N	3	3
c476ab01-2e09-4d81-8b70-938369d34918	36e69d89-acb0-4579-ac98-4571f28c407c	DomainValueString	\N	4	4
345a30dd-7fcd-4a07-a2a1-9959f2d8cf71	36e69d89-acb0-4579-ac98-4571f28c407c	DomainValueString	\N	5	5
f578b841-1b82-48db-ac2e-73aecaee378e	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	DomainValueString	\N	1	1
8cbed052-09b7-4865-9bbc-e34453da520a	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	DomainValueString	\N	2	2
6104742f-3b4b-4ee8-b456-38e9c86a8deb	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	DomainValueString	\N	3	3
0976cd4d-df16-4e52-b3fa-4f95b4415c03	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	1c452e5a-d2ae-4275-b3c2-d7736f26957c	\N	0
7df28af5-d9de-48e7-979b-3692dc3575e2	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	DomainValueString	\N	4	4
51883bd9-8298-414c-bf38-e6b281a9888d	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	DomainValueString	\N	5	5
417dd12d-a9fd-4c47-bc06-482fbff6e2a1	41b08c0c-ae32-4589-9272-a9e33477879a	DomainValueString	\N	4	4
945e6fcb-b0c1-4136-a639-3dc12ee704f5	41b08c0c-ae32-4589-9272-a9e33477879a	DomainValueString	\N	5	5
b2fc19b0-e2c9-4667-a106-f58b2fa44a3a	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	f499a0f4-11a3-40fa-8b4b-c8e31c0b0365	\N	0
88e52e0f-02e9-454f-b7d0-5b1060618ed6	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	d7b65df6-1396-48de-87c4-9e53693664cf	\N	0
f712fc46-f5c2-4f34-b8ae-4dbfb2ea8472	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	58c168db-813c-4bc9-99f7-667f00a8ded2	\N	0
08e6ef9e-9918-4bc3-99f9-92778fa90202	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	66ea626b-bc79-441a-a2d4-3f5b2c72a180	\N	0
fff33057-b3c3-481c-a1d3-fdb5bb072161	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	e5da8b2b-6347-4661-a531-351f4b487e99	\N	0
e06687fe-943c-40b4-af45-054dfcf423e2	a1bdf469-5010-453b-a554-a1fb2b1150de	DomainValueFrame	09d758a8-7390-4e00-8e3c-de3e632b089d	\N	0
\.


--
-- Data for Name: domains; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.domains (id, name, is_read_only, frame_base_id) FROM stdin;
36e69d89-acb0-4579-ac98-4571f28c407c	Health	f	b5f27702-89a5-418a-9af8-8a438f794ad2
41b08c0c-ae32-4589-9272-a9e33477879a	Y	f	b5f27702-89a5-418a-9af8-8a438f794ad2
3f336d1f-4622-4ff9-9fe7-d28e8f527a82	X	f	b5f27702-89a5-418a-9af8-8a438f794ad2
a1bdf469-5010-453b-a554-a1fb2b1150de	Frame	t	b5f27702-89a5-418a-9af8-8a438f794ad2
75544b8f-0248-45d4-b77e-3622686b2bc9	Strength	f	b5f27702-89a5-418a-9af8-8a438f794ad2
7601554e-1721-4775-a136-25710f4abe65	Color	f	b5f27702-89a5-418a-9af8-8a438f794ad2
b03c6bb0-6fdd-4fbb-a919-37c4ee2625f7	Picture	f	b5f27702-89a5-418a-9af8-8a438f794ad2
\.


--
-- Data for Name: frame_bases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.frame_bases (id, name, created_at, updated_at) FROM stdin;
b5f27702-89a5-418a-9af8-8a438f794ad2	default	2020-09-05 17:29:33	2020-09-05 17:29:33
\.


--
-- Data for Name: frames; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.frames (id, name, position_id, parent_id, frame_base_id) FROM stdin;
5b3a2dfb-dcb1-45fb-8921-40f44e759754	Entity	a868a97d-0c46-4c14-8839-128784fbebd3	\N	b5f27702-89a5-418a-9af8-8a438f794ad2
f1202893-3507-4d5f-838c-4aacfbe616da	Filled Cell	831bd8dc-d42c-414d-af13-ee50924f9a9f	5b3a2dfb-dcb1-45fb-8921-40f44e759754	b5f27702-89a5-418a-9af8-8a438f794ad2
33158b80-8545-4c1e-8c6d-c94694106161	Empty Cell	155fcaae-1809-4e61-a41c-23ab78f9eecf	5b3a2dfb-dcb1-45fb-8921-40f44e759754	b5f27702-89a5-418a-9af8-8a438f794ad2
4cbe9761-6894-43df-9794-1fbd03802ca5	Character	09222723-12da-4601-847e-02b4e0b9c560	f1202893-3507-4d5f-838c-4aacfbe616da	b5f27702-89a5-418a-9af8-8a438f794ad2
3bec3d4a-7716-4308-b7e3-69308c70994a	Dead Object	f774330e-6aa4-479d-b313-f04ae676c91c	f1202893-3507-4d5f-838c-4aacfbe616da	b5f27702-89a5-418a-9af8-8a438f794ad2
92c27b44-a319-462b-9994-fbab3782c1e0	Warrior	1e8e7c05-5b11-4a29-baf0-ad45aa1e6c4e	4cbe9761-6894-43df-9794-1fbd03802ca5	b5f27702-89a5-418a-9af8-8a438f794ad2
8fca3b12-bcc0-49b7-a5e0-fcd0429bd417	Witch	19af86fc-77c4-458f-997d-5f4cddfa77de	4cbe9761-6894-43df-9794-1fbd03802ca5	b5f27702-89a5-418a-9af8-8a438f794ad2
120de4fd-defd-4575-84a3-94507ee6b3ac	Potion	70fdc58b-b726-4f4e-b64d-08f2fa6eeeb7	3bec3d4a-7716-4308-b7e3-69308c70994a	b5f27702-89a5-418a-9af8-8a438f794ad2
1ee6703e-add7-440b-9852-dd019782cc1e	Red Warrior	b6220918-5cc0-4330-a499-3f83e9a26d97	92c27b44-a319-462b-9994-fbab3782c1e0	b5f27702-89a5-418a-9af8-8a438f794ad2
7beb8b44-0e70-4b33-98af-a9a827c6ff7f	White Warrior	02ef4a93-1140-4823-8a16-d7d8fae0a272	92c27b44-a319-462b-9994-fbab3782c1e0	b5f27702-89a5-418a-9af8-8a438f794ad2
ef3f9bb0-6c4c-4c94-9f4b-2513f2669d7f	Red Witch	97152a99-1030-45bf-90ef-f6b3179d08bc	8fca3b12-bcc0-49b7-a5e0-fcd0429bd417	b5f27702-89a5-418a-9af8-8a438f794ad2
2962fbc1-147c-4049-b8c4-e044cfa8a671	White Witch	872a4aee-1743-475c-b25a-e43c23cf3665	8fca3b12-bcc0-49b7-a5e0-fcd0429bd417	b5f27702-89a5-418a-9af8-8a438f794ad2
16610855-bc0f-4c5b-9cc0-822104ba5246	Poison	38d8a6e9-996c-4336-9e76-f61e0b1ea36d	120de4fd-defd-4575-84a3-94507ee6b3ac	b5f27702-89a5-418a-9af8-8a438f794ad2
3c864766-2f6a-4545-8cff-060413d22cd0	Healing Potion	f5c07b34-d39e-4627-8998-5fa77bec9bcd	120de4fd-defd-4575-84a3-94507ee6b3ac	b5f27702-89a5-418a-9af8-8a438f794ad2
8cba83f7-dd30-4a7e-80bd-e959c269ab05	Situation	8b6864db-28f7-48b2-a342-1206b7ee4c99	\N	b5f27702-89a5-418a-9af8-8a438f794ad2
f42602c6-3946-4a8f-abe3-091fbad526e7	Nothing To Do	3f551721-eab1-4a75-a542-94fc7d278c0f	8cba83f7-dd30-4a7e-80bd-e959c269ab05	b5f27702-89a5-418a-9af8-8a438f794ad2
712b1247-d47e-47ab-a89c-d2730b01c884	Situation with Warrior	be64548c-8675-41bc-ba9f-9de2d8719426	8cba83f7-dd30-4a7e-80bd-e959c269ab05	b5f27702-89a5-418a-9af8-8a438f794ad2
7d9d6812-63d9-44ea-a429-03ef61dacb3d	Situation With Witch	348415a1-c9c1-4af7-a1d9-ddd918cbca5d	8cba83f7-dd30-4a7e-80bd-e959c269ab05	b5f27702-89a5-418a-9af8-8a438f794ad2
3618f087-0918-4cc7-9a01-8a82a4906b4c	Potion From Left	3ce6632e-adae-44d2-bdc7-d6ff9a73d7fe	7d9d6812-63d9-44ea-a429-03ef61dacb3d	b5f27702-89a5-418a-9af8-8a438f794ad2
d255a782-9a81-4341-9d07-51e761f130af	Result	4d48ebf8-c711-4e2c-969f-0a63068cca14	\N	b5f27702-89a5-418a-9af8-8a438f794ad2
9a7d38d9-399a-4ba9-ad36-a0252b435d53	Game Field	9809af47-47b6-4d88-b410-b21d63ceac90	\N	b5f27702-89a5-418a-9af8-8a438f794ad2
8065a1ff-bca0-42c1-bbda-187bc952c06e	Step Up	30484870-c479-4ce3-9f70-7dcd3c4eb68b	d255a782-9a81-4341-9d07-51e761f130af	b5f27702-89a5-418a-9af8-8a438f794ad2
63f25dd2-c3e4-4429-abfb-643b4c7165c2	Nothing To Do (Step Up)	5abc92f5-fe18-4036-806c-49d69a29a45a	f42602c6-3946-4a8f-abe3-091fbad526e7	b5f27702-89a5-418a-9af8-8a438f794ad2
1c452e5a-d2ae-4275-b3c2-d7736f26957c	Warrior Enemies Around	eced0643-d339-46f9-abef-fa194ce569ca	712b1247-d47e-47ab-a89c-d2730b01c884	b5f27702-89a5-418a-9af8-8a438f794ad2
f499a0f4-11a3-40fa-8b4b-c8e31c0b0365	Nothing To Do (Step Down)	5b1703a9-e523-410b-b7a0-c19607421843	f42602c6-3946-4a8f-abe3-091fbad526e7	b5f27702-89a5-418a-9af8-8a438f794ad2
d7b65df6-1396-48de-87c4-9e53693664cf	Step Down	abc7f0f2-282d-48b2-9d9a-0a25f14e5226	d255a782-9a81-4341-9d07-51e761f130af	b5f27702-89a5-418a-9af8-8a438f794ad2
58c168db-813c-4bc9-99f7-667f00a8ded2	Step Left	994cf055-68d0-4783-a567-13cf9f0e441c	d255a782-9a81-4341-9d07-51e761f130af	b5f27702-89a5-418a-9af8-8a438f794ad2
66ea626b-bc79-441a-a2d4-3f5b2c72a180	Step Right	9c18e8f0-b750-4fd9-a37e-55a547ba28d8	d255a782-9a81-4341-9d07-51e761f130af	b5f27702-89a5-418a-9af8-8a438f794ad2
e5da8b2b-6347-4661-a531-351f4b487e99	Nothing To Do (Step Left)	a35c460b-d1d4-4bd6-aa86-bdb9c673fc65	f42602c6-3946-4a8f-abe3-091fbad526e7	b5f27702-89a5-418a-9af8-8a438f794ad2
09d758a8-7390-4e00-8e3c-de3e632b089d	Nothing To Do (Step Right)	fbb0ddfd-7b05-49ea-8436-8590f4746abd	f42602c6-3946-4a8f-abe3-091fbad526e7	b5f27702-89a5-418a-9af8-8a438f794ad2
\.


--
-- Data for Name: positions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.positions (id, x, y) FROM stdin;
30484870-c479-4ce3-9f70-7dcd3c4eb68b	-1136.2930339795705	9.6239508428932812
abc7f0f2-282d-48b2-9d9a-0a25f14e5226	-1041.579878186313	22.369450362590552
994cf055-68d0-4783-a567-13cf9f0e441c	-942.75562146960351	26.545123181606439
9c18e8f0-b750-4fd9-a37e-55a547ba28d8	-852.28271039092601	16.801886603902705
7257ec59-70db-44c8-8c58-d2e9ff34adba	-1102.4026762952303	130.94736842105263
607daff1-fb63-429f-8bf6-4c6308af5117	-1060.0932026110197	141.16
a35c460b-d1d4-4bd6-aa86-bdb9c673fc65	-714.53728473489059	188.77092400627677
5b1703a9-e523-410b-b7a0-c19607421843	-916.32184736377701	198.51224771939542
5abc92f5-fe18-4036-806c-49d69a29a45a	-1034.6093495945036	121.97327568774884
fbb0ddfd-7b05-49ea-8436-8590f4746abd	-509.87753923162342	195.72807281679539
9809af47-47b6-4d88-b410-b21d63ceac90	-1170.8584693459579	-121.12838918484672
4d48ebf8-c711-4e2c-969f-0a63068cca14	-951.58097576876662	-122.79443970904367
a868a97d-0c46-4c14-8839-128784fbebd3	-35.239049214735488	-133.04107467051048
155fcaae-1809-4e61-a41c-23ab78f9eecf	-142.09681381288928	-71.561264901709663
831bd8dc-d42c-414d-af13-ee50924f9a9f	134.56233014671437	-71.561264901709663
f774330e-6aa4-479d-b313-f04ae676c91c	258.98575467881125	3.0927898175484638
09222723-12da-4601-847e-02b4e0b9c560	-24.992414253268684	-8.6176501384135946
1e8e7c05-5b11-4a29-baf0-ad45aa1e6c4e	-166.45815474436355	62.463852875023989
02ef4a93-1140-4823-8a16-d7d8fae0a272	-267.09938041019888	121.66457385492711
b6220918-5cc0-4330-a499-3f83e9a26d97	-111.69748783795315	126.10462792841984
19af86fc-77c4-458f-997d-5f4cddfa77de	125.10539608165935	58.023798801531257
70fdc58b-b726-4f4e-b64d-08f2fa6eeeb7	409.26885678519437	78.744051144497348
38d8a6e9-996c-4336-9e76-f61e0b1ea36d	503.99001035303934	137.94477212440046
f5c07b34-d39e-4627-8998-5fa77bec9bcd	355.98820790328153	136.4647540999029
97152a99-1030-45bf-90ef-f6b3179d08bc	216.86651360050919	127.58464595291743
872a4aee-1743-475c-b25a-e43c23cf3665	102.90512571419568	126.10462792841984
8b6864db-28f7-48b2-a342-1206b7ee4c99	-533.5026248197629	-124.01841821167086
348415a1-c9c1-4af7-a1d9-ddd918cbca5d	-345.54033570857052	-75.177823403250784
3ce6632e-adae-44d2-bdc7-d6ff9a73d7fe	-310.01990312062861	1.7831138706232847
be64548c-8675-41bc-ba9f-9de2d8719426	-478.74195791335251	-11.537048349854919
eced0643-d339-46f9-abef-fa194ce569ca	-423.98129100694212	78.744051144497348
3f551721-eab1-4a75-a542-94fc7d278c0f	-682.98444529401831	-79.617877476743516
\.


--
-- Data for Name: productions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productions (id, text, slot_id) FROM stdin;
b8b948bc-124d-4eb2-80e7-21f6f2abccfd	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] - 1)]	d249319f-010a-4b50-a31f-2b14a036b508
dcf9f7ba-8220-40e9-af6d-be75774203f8	('Game Field')['Cell_' + (this['Agent']['X'] - 1) + '_' + this['Agent']['Y']]	34837939-80ae-4b27-877a-47a496b2e8c2
1f49dcfd-b800-4527-9163-c89bb6888cbc	('Game Field')['Cell_' + (this['Agent']['X'] + 1) + '_' + this['Agent']['Y']]	9bedf6c0-8b21-4e31-94fb-c82671a6cb33
07de83bc-e166-42da-b08a-17318d56a3bc	('Game Field')['Cell_' + (this['Agent']['X'] - 1) + '_' + this['Agent']['Y']]	89dc67bc-82fd-4535-a252-4215ba24be1e
98fa7c57-3431-4f96-b57d-68fb598e235a	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] + 1)]	eb19d6fa-6d1b-4aed-b9ef-0472157e2294
b261c140-9a12-45ea-afde-ca05ac6143a9	('Game Field')['Cell_' + (this['Agent']['X'] + 1) + '_' + this['Agent']['Y']]	2c89b0b4-a5b0-4ff8-ba9b-b9f564cb8f0b
7644119a-0213-4506-b89d-4e032316859e	if 1 < 0 then 'Entity'	e1c6bc93-c68d-4830-bf36-1855e90bdb76
6162aabc-4870-4e88-b160-3ece07df6fd5	if 1 < 0 then 'Entity'	41434e16-1607-4a3a-bbc3-297a13e7638d
3596a273-d09a-4510-b944-d414b6ef44b1	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] - 1)]	cf1656d8-0da9-4310-bdf6-347d8099637b
ce1c0bb7-0986-4e08-bd60-d5afbb9300aa	this['Agent']['Y'] = this['Agent']['Y'] - 1	b3aaf853-d590-417a-b4bc-ea3fc73d7db8
be460065-f2b3-47b6-ab80-5f52c0df0fe0	('Game Field')['Cell_' + (this['Agent']['X'] + 1) + '_' + this['Agent']['Y']]	75ee3928-f43f-4045-a1d0-14eadf650768
82bd1e91-b326-4c60-a839-13ed2d0ea5df	('Game Field')['Cell_' + (this['Agent']['X'] + 1) + '_' + this['Agent']['Y']]	d1096dfc-354a-471b-8ae5-5f5e4c5a9afe
1de674de-5eee-4979-b7eb-67c6a5e2b9c7	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] - 1)]	6a8f7f01-a598-40a2-ad55-53a206e73e2c
f3a5c69a-596b-48b4-b009-9d87f1d28b21	('Game Field')['Cell_' + (this['Agent']['X'] + 1) + '_' + this['Agent']['Y']]	9c62ef3e-7e50-43b7-8df6-5d903cb05d20
22865ba2-7305-4c63-98e8-77bb7ed19f26	'Step Up'	20d115a3-9e2e-494d-8c77-cb9dcbf43e7c
4e53f347-3c4e-450c-95ec-2ce3f389764d	('Game Field')['Cell_' + (this['Agent']['X'] + 1) + '_' + this['Agent']['Y']]	a1d3c339-ec11-4036-b81a-5486808ed25d
f9568172-c9e7-4828-9508-5871c46af2ee	('Game Field')['Cell_' + (this['Agent']['X'] + 1) + '_' + this['Agent']['Y']]	211e2a9c-124e-498d-bfa3-c412357145c2
d8392625-735f-41cd-8d8c-07ad9b9d30a7	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] + 1)]	1475fa05-773f-4c30-a368-b8a3ec2cd5fe
525c9e69-2987-464b-bc32-6ce9d2248332	if 1 < 0 then 'Entity'	8286c940-fa7c-4a22-8940-9a80bf16a461
11744356-c620-427d-b271-f1ff3d07a72f	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] + 1)]	83e27bc1-7fb8-4b20-990b-c0a2c90f920c
2762c4b3-b57a-4a64-b9c7-f020b125a420	('Game Field')['Cell_' + (this['Agent']['X'] - 1) + '_' + this['Agent']['Y']]	6d303b6f-977b-481f-8253-ff35850ffe02
79d5aefa-6ab6-4aab-90e5-e4332635c61f	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] + 1)]	5d48b247-e879-41f8-9989-306645720e9c
986c29c6-d5af-4094-bf4f-00d973e524c2	if 1 < 0 then 'Entity'	1b9b2aa1-3e84-420e-bb57-1385b0cd7c87
001a83cf-7a78-4aee-92d2-2a6ec0d76d7c	if 1 < 0 then 'Entity'	632f0a3a-9855-4037-9c6c-9887fd5869b4
8968a96c-0da3-4f97-94f8-90bd56688d52	if 1 < 0 then 'Entity'	ba88834c-0868-4ab3-ae7a-33b70da24763
0ba591de-cfd0-497e-b844-70f043567fba	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] + 1)]	433efba2-f658-4f04-be92-1f7bbe08b3df
24e501c2-7323-4f35-9a61-5c298e615682	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] + 1)]	3a9e27fc-a31c-4687-b5b0-f195ab6de75e
94612c03-88fc-4df6-af74-2e165b2aa83d	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] + 1)]	d88a9974-b6ff-415c-9d27-9c9b4ef34e19
b0924a5d-57a2-4e12-ac32-07c40b51f888	('Game Field')['Cell_' + (this['Agent']['X'] - 1) + '_' + this['Agent']['Y']]	389c5157-f50b-4b91-8aa6-45d6b54f7ce8
fb1ce4b5-e000-4ca9-b7a9-f47bdf1f68ac	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] + 1)]	5d50cd8d-ce13-49e1-bc1f-f370173a1f29
276c75e3-05fd-43b6-850f-eec886c00507	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] + 1)]	37020090-6d81-456c-9ed3-30c9a7cab1f2
23e33061-5a20-4670-b61b-248c6e1013bf	('Game Field')['Cell_' + (this['Agent']['X'] - 1) + '_' + this['Agent']['Y']]	8a7e8675-44c6-4465-92ba-ab88fa5f0927
efd5a0be-6535-46b5-b397-b1350903627b	('Game Field')['Cell_' + (this['Agent']['X'] - 1) + '_' + this['Agent']['Y']]	dbbbeeff-06a4-46b7-9266-66c99b6af403
6a546b66-b0ca-40f0-ab16-82a23e125c2e	('Game Field')['Cell_' + (this['Agent']['X'] - 1) + '_' + this['Agent']['Y']]	6be70448-faca-4986-9b44-2706e7e7334c
e1c05846-724f-4206-8dd6-837a1c940b34	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] - 1)]	ac825925-4138-4279-9e6b-c18064da770e
bf510cd6-e8ca-4cbd-b449-14c08923c1a7	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] - 1)]	f6404ef1-8cde-40d1-ad47-ed6e3216c98b
3cf23587-7724-42de-a6e4-3f27192125fc	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] - 1)]	26dc98eb-b0d6-4da6-89cd-816791e85d5d
ffd69438-b488-4541-ad03-e600215a4d08	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] - 1)]	8cfdd1f5-df5c-404d-8001-783068f59f44
9435767a-2e5b-4ebe-8814-ab3093578733	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] - 1)]	f534087d-3ecb-4a11-a4e7-edbed8f57269
2c0429f0-2311-497c-8445-2f5ba5b503a3	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] - 1)]	18de8137-da19-4051-9f6a-7b3418ced384
6e661bae-5962-4823-b9fd-47ac10279f2a	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] + 1)]	fbc162f7-682a-4be5-bcb7-143460e98dde
a44cd2a6-1220-4305-90c1-f81658156463	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] - 1)]	ae90af3f-55d2-405f-ad7f-f85ddeb70fbc
9abd57f4-5291-4c0f-9373-f9fa9b88815a	('Game Field')['Cell_' + (this['Agent']['X'] - 1) + '_' + this['Agent']['Y']]	19b83d36-a6b6-4885-8675-9c98f19486ef
ee28d4a2-a6a2-4b86-aaef-772b8f48238d	('Game Field')['Cell_' + (this['Agent']['X'] + 1) + '_' + this['Agent']['Y']]	a3e704bb-9e18-44fb-95a1-e3dd2d16da4b
831bd772-d74b-4482-b38f-85e9bf845795	'Step Left'	f9c9a503-25ad-4282-8263-6cbe02f98ca0
34800bbd-3908-40d3-8371-f82f5e04b58e	'Step Down'	e303cb90-5326-43c5-a85c-5a798e693cc5
88194426-0e03-4085-8557-a48946cf3158	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] + 1)]	0c0be83f-b204-4406-9d20-93a5a881310b
318ac211-f2a1-40a1-ab4c-f010f0883cde	this['Agent']['Y'] = this['Agent']['Y'] + 1	359f1baf-ff63-4434-aa29-cfbc463a3a5b
bcf8835c-b2ad-4bb9-809e-4de2084856e2	('Game Field')['Cell_' + (this['Agent']['X'] - 1) + '_' + this['Agent']['Y']]	095ed9fd-c739-43f0-b323-340929e2ad81
ec43d437-93a2-42d1-8c75-723ce8819e8f	this['Agent']['X'] = this['Agent']['X'] - 1	0e259b32-365e-49e8-92c8-8ff072a43a64
be2c848b-7d6e-4345-ab31-fd5667e2ff76	this['Agent']['X'] = this['Agent']['X'] + 1	f3e6d4b6-5559-4d70-be5d-ebd025a30100
ed522f25-93c0-4e66-9d2d-13d0757375a5	('Game Field')['Cell_' + (this['Agent']['X'] + 1) + '_' + this['Agent']['Y']]	30e75ee4-3c66-47a7-bd9e-b03ec194da6b
6a3d780a-0f12-455f-96f5-d17c377613b8	('Game Field')['Cell_' + (this['Agent']['X'] + 1) + '_' + this['Agent']['Y']]	2be5fbf0-f44b-47c8-8817-dfc712d94fba
f469bbeb-3dd2-497f-bf71-bf27acc7990c	('Game Field')['Cell_' + (this['Agent']['X'] - 1) + '_' + this['Agent']['Y']]	dfb5d46e-b601-4d5a-bbca-4b48b347ae5b
ef53ed3d-b674-4b1e-8fa5-afc1d070ec87	('Game Field')['Cell_' + (this['Agent']['X'] + 1) + '_' + this['Agent']['Y']]	da1572ed-03b2-43b7-a0e7-883b5e0f468a
699e3ab3-27bb-4e64-bccf-609f30f4ed6e	('Game Field')['Cell_' + this['Agent']['X'] + '_' + (this['Agent']['Y'] - 1)]	19216968-9926-471f-a074-e55c54752b96
0ba099b2-a090-4c70-a2aa-23fcdbd3555a	('Game Field')['Cell_' + (this['Agent']['X'] - 1) + '_' + this['Agent']['Y']]	237847cc-7e0f-4461-9f67-007ccd9f1983
8dc74eea-6470-4044-8b2f-17b5d35eec88	'Step Right'	947c2600-8b1a-46ee-94d5-25296d63681f
\.


--
-- Data for Name: slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.slots (id, name, is_inherited, owner_id, parent_id, domain_id, value_id, "order") FROM stdin;
c1169ac8-a492-4583-ad3d-312623a54999	Agent	f	8cba83f7-dd30-4a7e-80bd-e959c269ab05	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	0af4bb53-e137-46d7-b2ad-ce3df2eedb5a	0
ae90af3f-55d2-405f-ad7f-f85ddeb70fbc	Top	t	f499a0f4-11a3-40fa-8b4b-c8e31c0b0365	ac825925-4138-4279-9e6b-c18064da770e	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	3
a850a6fe-06c7-46e2-870c-3a4f2e8e4142	Agent	t	63f25dd2-c3e4-4429-abfb-643b4c7165c2	515fcb04-ab09-4c23-b2c4-402c742db474	a1bdf469-5010-453b-a554-a1fb2b1150de	0af4bb53-e137-46d7-b2ad-ce3df2eedb5a	0
5981befd-0053-4c4a-bce2-b14c88fe2424	Agent	t	8065a1ff-bca0-42c1-bbda-187bc952c06e	e0a23c8d-57a8-423d-82bf-07d564c886ab	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	0
a3e704bb-9e18-44fb-95a1-e3dd2d16da4b	Right	t	f499a0f4-11a3-40fa-8b4b-c8e31c0b0365	2c89b0b4-a5b0-4ff8-ba9b-b9f564cb8f0b	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	2
e1d2745d-1905-4a60-8c43-1777b6e4d420	Agent	t	f499a0f4-11a3-40fa-8b4b-c8e31c0b0365	515fcb04-ab09-4c23-b2c4-402c742db474	a1bdf469-5010-453b-a554-a1fb2b1150de	0af4bb53-e137-46d7-b2ad-ce3df2eedb5a	0
23f99a5d-c887-4957-94d0-3b3ec574562d	Cell_0_0	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	0
cf1656d8-0da9-4310-bdf6-347d8099637b	Up	f	8065a1ff-bca0-42c1-bbda-187bc952c06e	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	558fd008-34eb-441c-9604-d6dcfb9c839a	1
b3aaf853-d590-417a-b4bc-ea3fc73d7db8	Step Up	f	8065a1ff-bca0-42c1-bbda-187bc952c06e	\N	41b08c0c-ae32-4589-9272-a9e33477879a	\N	2
e0a23c8d-57a8-423d-82bf-07d564c886ab	Agent	f	d255a782-9a81-4341-9d07-51e761f130af	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	0
c4ad532d-8023-4868-9d24-7a095d235937	Agent	t	712b1247-d47e-47ab-a89c-d2730b01c884	c1169ac8-a492-4583-ad3d-312623a54999	a1bdf469-5010-453b-a554-a1fb2b1150de	2e606c16-d5e6-4e60-adaf-ef6d6a2a2981	0
8916f73e-0de0-4ae1-86b9-7226920ea814	X	t	120de4fd-defd-4575-84a3-94507ee6b3ac	3f7a44ce-c949-4df5-be69-3073f73075d0	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	\N	0
6c6304c7-09d1-4a08-8095-c1b4f53ab328	X	t	1ee6703e-add7-440b-9852-dd019782cc1e	295ffe62-21d1-4732-819c-158f89f66e16	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	\N	0
295ffe62-21d1-4732-819c-158f89f66e16	X	t	92c27b44-a319-462b-9994-fbab3782c1e0	6c93b888-3d18-4baa-b490-647b701a8a3e	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	\N	0
39f8211a-7cb0-46a1-9afe-bb880b955844	X	t	16610855-bc0f-4c5b-9cc0-822104ba5246	8916f73e-0de0-4ae1-86b9-7226920ea814	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	\N	0
03c6c436-5f66-4b41-a293-dda0a3efaafb	X	t	7beb8b44-0e70-4b33-98af-a9a827c6ff7f	295ffe62-21d1-4732-819c-158f89f66e16	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	\N	0
6c93b888-3d18-4baa-b490-647b701a8a3e	X	t	4cbe9761-6894-43df-9794-1fbd03802ca5	0c5901b8-5eac-4104-b630-ff52523d5cd8	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	\N	0
c16c1023-d41e-4616-8796-0463ec05c42b	X	t	ef3f9bb0-6c4c-4c94-9f4b-2513f2669d7f	62f3e57e-1f22-49cf-9a0f-1e626f1f8a11	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	\N	0
b4b3f999-320c-4847-a725-4017177566e4	Cell_2_1	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	13
21b749a8-3321-4a80-b263-aec4f216f56e	Picture	t	f1202893-3507-4d5f-838c-4aacfbe616da	e874b32b-8b1d-4053-b511-0e1c5870e1b5	b03c6bb0-6fdd-4fbb-a919-37c4ee2625f7	\N	2
48ce79e3-eb2c-4bc4-a3f9-1d7f4a51898b	X	f	5b3a2dfb-dcb1-45fb-8921-40f44e759754	\N	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	\N	0
e874b32b-8b1d-4053-b511-0e1c5870e1b5	Picture	f	5b3a2dfb-dcb1-45fb-8921-40f44e759754	\N	b03c6bb0-6fdd-4fbb-a919-37c4ee2625f7	\N	2
a956d7d1-aed4-4293-82dd-1dca1961df7f	Picture	t	33158b80-8545-4c1e-8c6d-c94694106161	e874b32b-8b1d-4053-b511-0e1c5870e1b5	b03c6bb0-6fdd-4fbb-a919-37c4ee2625f7	\N	2
d568f5ed-8381-456c-a092-207efe5a24bd	Cell_2_0	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	12
5343ba4a-91ca-4c15-8dea-e53383a7e01d	Health	t	1ee6703e-add7-440b-9852-dd019782cc1e	834d5ef1-9499-4c90-ba78-1e947a353504	36e69d89-acb0-4579-ac98-4571f28c407c	\N	3
edc272a1-565e-43f3-9a2d-4cec68124069	Picture	t	16610855-bc0f-4c5b-9cc0-822104ba5246	01716273-5edf-4fc7-b9a6-52d64933c252	b03c6bb0-6fdd-4fbb-a919-37c4ee2625f7	\N	2
01716273-5edf-4fc7-b9a6-52d64933c252	Picture	t	120de4fd-defd-4575-84a3-94507ee6b3ac	2369d479-60a4-48bc-82c1-327e62fae448	b03c6bb0-6fdd-4fbb-a919-37c4ee2625f7	\N	2
1b9b2aa1-3e84-420e-bb57-1385b0cd7c87	Result	f	8cba83f7-dd30-4a7e-80bd-e959c269ab05	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	c47fe03b-c048-46d0-b778-3d1ea21b0b9d	5
632f0a3a-9855-4037-9c6c-9887fd5869b4	Result	t	3618f087-0918-4cc7-9a01-8a82a4906b4c	e1c6bc93-c68d-4830-bf36-1855e90bdb76	a1bdf469-5010-453b-a554-a1fb2b1150de	c47fe03b-c048-46d0-b778-3d1ea21b0b9d	5
ba88834c-0868-4ab3-ae7a-33b70da24763	Result	t	712b1247-d47e-47ab-a89c-d2730b01c884	1b9b2aa1-3e84-420e-bb57-1385b0cd7c87	a1bdf469-5010-453b-a554-a1fb2b1150de	c47fe03b-c048-46d0-b778-3d1ea21b0b9d	5
9bedf6c0-8b21-4e31-94fb-c82671a6cb33	Right	t	63f25dd2-c3e4-4429-abfb-643b4c7165c2	2c89b0b4-a5b0-4ff8-ba9b-b9f564cb8f0b	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	2
2c89b0b4-a5b0-4ff8-ba9b-b9f564cb8f0b	Right	t	f42602c6-3946-4a8f-abe3-091fbad526e7	211e2a9c-124e-498d-bfa3-c412357145c2	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	2
75ee3928-f43f-4045-a1d0-14eadf650768	Right	t	7d9d6812-63d9-44ea-a429-03ef61dacb3d	211e2a9c-124e-498d-bfa3-c412357145c2	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	2
d1096dfc-354a-471b-8ae5-5f5e4c5a9afe	Right	t	1c452e5a-d2ae-4275-b3c2-d7736f26957c	a1d3c339-ec11-4036-b81a-5486808ed25d	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	2
9c62ef3e-7e50-43b7-8df6-5d903cb05d20	Right	t	3618f087-0918-4cc7-9a01-8a82a4906b4c	75ee3928-f43f-4045-a1d0-14eadf650768	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	2
a1d3c339-ec11-4036-b81a-5486808ed25d	Right	t	712b1247-d47e-47ab-a89c-d2730b01c884	211e2a9c-124e-498d-bfa3-c412357145c2	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	2
433efba2-f658-4f04-be92-1f7bbe08b3df	Bottom	t	7d9d6812-63d9-44ea-a429-03ef61dacb3d	37020090-6d81-456c-9ed3-30c9a7cab1f2	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	4
3a9e27fc-a31c-4687-b5b0-f195ab6de75e	Bottom	t	63f25dd2-c3e4-4429-abfb-643b4c7165c2	d88a9974-b6ff-415c-9d27-9c9b4ef34e19	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	4
d88a9974-b6ff-415c-9d27-9c9b4ef34e19	Bottom	t	f42602c6-3946-4a8f-abe3-091fbad526e7	37020090-6d81-456c-9ed3-30c9a7cab1f2	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	4
389c5157-f50b-4b91-8aa6-45d6b54f7ce8	Left	t	63f25dd2-c3e4-4429-abfb-643b4c7165c2	34837939-80ae-4b27-877a-47a496b2e8c2	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	1
5d50cd8d-ce13-49e1-bc1f-f370173a1f29	Bottom	t	1c452e5a-d2ae-4275-b3c2-d7736f26957c	1475fa05-773f-4c30-a368-b8a3ec2cd5fe	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	4
89dc67bc-82fd-4535-a252-4215ba24be1e	Left	t	1c452e5a-d2ae-4275-b3c2-d7736f26957c	6d303b6f-977b-481f-8253-ff35850ffe02	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	1
6d303b6f-977b-481f-8253-ff35850ffe02	Left	t	712b1247-d47e-47ab-a89c-d2730b01c884	6be70448-faca-4986-9b44-2706e7e7334c	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	1
8a7e8675-44c6-4465-92ba-ab88fa5f0927	Left	t	3618f087-0918-4cc7-9a01-8a82a4906b4c	dbbbeeff-06a4-46b7-9266-66c99b6af403	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	1
dbbbeeff-06a4-46b7-9266-66c99b6af403	Left	t	7d9d6812-63d9-44ea-a429-03ef61dacb3d	6be70448-faca-4986-9b44-2706e7e7334c	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	1
f6404ef1-8cde-40d1-ad47-ed6e3216c98b	Top	t	3618f087-0918-4cc7-9a01-8a82a4906b4c	26dc98eb-b0d6-4da6-89cd-816791e85d5d	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	3
26dc98eb-b0d6-4da6-89cd-816791e85d5d	Top	t	7d9d6812-63d9-44ea-a429-03ef61dacb3d	8cfdd1f5-df5c-404d-8001-783068f59f44	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	3
8cfdd1f5-df5c-404d-8001-783068f59f44	Top	f	8cba83f7-dd30-4a7e-80bd-e959c269ab05	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	3
41434e16-1607-4a3a-bbc3-297a13e7638d	Result	t	1c452e5a-d2ae-4275-b3c2-d7736f26957c	ba88834c-0868-4ab3-ae7a-33b70da24763	a1bdf469-5010-453b-a554-a1fb2b1150de	c47fe03b-c048-46d0-b778-3d1ea21b0b9d	5
d61256eb-0347-4e17-914e-7e932d465fba	Picture	t	92c27b44-a319-462b-9994-fbab3782c1e0	7b996bf9-4872-413b-8f16-b842b809df15	b03c6bb0-6fdd-4fbb-a919-37c4ee2625f7	\N	2
2369d479-60a4-48bc-82c1-327e62fae448	Picture	t	3bec3d4a-7716-4308-b7e3-69308c70994a	21b749a8-3321-4a80-b263-aec4f216f56e	b03c6bb0-6fdd-4fbb-a919-37c4ee2625f7	\N	2
57939988-f8f2-4ef6-876b-17f2f038669c	Health	t	7beb8b44-0e70-4b33-98af-a9a827c6ff7f	834d5ef1-9499-4c90-ba78-1e947a353504	36e69d89-acb0-4579-ac98-4571f28c407c	\N	3
0798f1f7-9c55-4862-9664-2e574db5e9b7	Health	t	8fca3b12-bcc0-49b7-a5e0-fcd0429bd417	bedf77ab-6718-4f92-a03d-4d245a02a6aa	36e69d89-acb0-4579-ac98-4571f28c407c	\N	3
6c35c488-51cc-494f-b1aa-c5cb1c38cd16	Health	t	2962fbc1-147c-4049-b8c4-e044cfa8a671	0798f1f7-9c55-4862-9664-2e574db5e9b7	36e69d89-acb0-4579-ac98-4571f28c407c	\N	3
cc355c49-8a9b-4761-b53f-5cba9ceff642	Health	f	120de4fd-defd-4575-84a3-94507ee6b3ac	\N	36e69d89-acb0-4579-ac98-4571f28c407c	\N	3
70c0dcdb-3617-4975-8bb6-9841237c728b	Strength	t	1ee6703e-add7-440b-9852-dd019782cc1e	c6804c3e-c91d-462f-ae27-d61e89f99091	75544b8f-0248-45d4-b77e-3622686b2bc9	\N	4
72f956e6-3226-4aec-9e9f-76b742ff6c84	Strength	t	2962fbc1-147c-4049-b8c4-e044cfa8a671	a8998988-52f7-4755-bd40-9dd796e479b0	75544b8f-0248-45d4-b77e-3622686b2bc9	\N	4
d665ba22-657c-4baa-91b1-02bf327351d9	Strength	f	4cbe9761-6894-43df-9794-1fbd03802ca5	\N	75544b8f-0248-45d4-b77e-3622686b2bc9	\N	4
a8998988-52f7-4755-bd40-9dd796e479b0	Strength	t	8fca3b12-bcc0-49b7-a5e0-fcd0429bd417	d665ba22-657c-4baa-91b1-02bf327351d9	75544b8f-0248-45d4-b77e-3622686b2bc9	\N	4
46277bfb-951f-434e-ab98-44113c60d9e8	Color	t	8fca3b12-bcc0-49b7-a5e0-fcd0429bd417	0174b77e-b8fd-48cb-8de4-f11b68dcd162	7601554e-1721-4775-a136-25710f4abe65	\N	5
0174b77e-b8fd-48cb-8de4-f11b68dcd162	Color	f	4cbe9761-6894-43df-9794-1fbd03802ca5	\N	7601554e-1721-4775-a136-25710f4abe65	\N	5
0ee8c589-45bb-4a36-a943-3a92448a991d	Color	t	7beb8b44-0e70-4b33-98af-a9a827c6ff7f	27a053ea-9766-4cad-aecb-93164a7b76c1	7601554e-1721-4775-a136-25710f4abe65	076159c1-43bd-4e25-b251-3285637d87ba	5
e6a21707-c430-45b0-8bc9-5b37436f9647	Color	t	2962fbc1-147c-4049-b8c4-e044cfa8a671	46277bfb-951f-434e-ab98-44113c60d9e8	7601554e-1721-4775-a136-25710f4abe65	076159c1-43bd-4e25-b251-3285637d87ba	5
2f3a2e40-3bb3-49d8-86b5-0e6deaad7560	Picture	t	ef3f9bb0-6c4c-4c94-9f4b-2513f2669d7f	369300b3-6ae8-4dd2-ae25-36a2b42e4fd8	b03c6bb0-6fdd-4fbb-a919-37c4ee2625f7	2f0af187-e21e-421f-8729-9a363f72756a	2
8220f2fc-a08b-4897-8fc0-1db46e777885	Picture	t	1ee6703e-add7-440b-9852-dd019782cc1e	d61256eb-0347-4e17-914e-7e932d465fba	b03c6bb0-6fdd-4fbb-a919-37c4ee2625f7	82e2ab48-1fdd-4ba0-a039-81c201199774	2
0c5901b8-5eac-4104-b630-ff52523d5cd8	X	t	f1202893-3507-4d5f-838c-4aacfbe616da	48ce79e3-eb2c-4bc4-a3f9-1d7f4a51898b	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	\N	0
5dcecccf-6527-4a54-bef7-7c902eef3b99	X	t	33158b80-8545-4c1e-8c6d-c94694106161	48ce79e3-eb2c-4bc4-a3f9-1d7f4a51898b	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	\N	0
c38f66f9-100b-4e01-8d7a-27aa27f6d9c1	X	t	2962fbc1-147c-4049-b8c4-e044cfa8a671	62f3e57e-1f22-49cf-9a0f-1e626f1f8a11	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	\N	0
ac0f9d7c-0012-49bf-baaa-ae30c09144ac	X	t	3c864766-2f6a-4545-8cff-060413d22cd0	8916f73e-0de0-4ae1-86b9-7226920ea814	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	\N	0
3f7a44ce-c949-4df5-be69-3073f73075d0	X	t	3bec3d4a-7716-4308-b7e3-69308c70994a	0c5901b8-5eac-4104-b630-ff52523d5cd8	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	\N	0
62f3e57e-1f22-49cf-9a0f-1e626f1f8a11	X	t	8fca3b12-bcc0-49b7-a5e0-fcd0429bd417	6c93b888-3d18-4baa-b490-647b701a8a3e	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	\N	0
515fcb04-ab09-4c23-b2c4-402c742db474	Agent	t	f42602c6-3946-4a8f-abe3-091fbad526e7	c1169ac8-a492-4583-ad3d-312623a54999	a1bdf469-5010-453b-a554-a1fb2b1150de	0af4bb53-e137-46d7-b2ad-ce3df2eedb5a	0
19b83d36-a6b6-4885-8675-9c98f19486ef	Left	t	f499a0f4-11a3-40fa-8b4b-c8e31c0b0365	34837939-80ae-4b27-877a-47a496b2e8c2	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	1
87f54196-7e9d-4e16-a81a-8b7a81f25576	Agent	t	3618f087-0918-4cc7-9a01-8a82a4906b4c	d8c1877f-afb9-4134-a253-70ad2ec03614	a1bdf469-5010-453b-a554-a1fb2b1150de	125aaabf-acd5-42ff-9359-6e63533854a1	0
d8c1877f-afb9-4134-a253-70ad2ec03614	Agent	t	7d9d6812-63d9-44ea-a429-03ef61dacb3d	c1169ac8-a492-4583-ad3d-312623a54999	a1bdf469-5010-453b-a554-a1fb2b1150de	125aaabf-acd5-42ff-9359-6e63533854a1	0
5368e12b-f3ba-46da-a334-b55e036d7640	Agent	t	1c452e5a-d2ae-4275-b3c2-d7736f26957c	c4ad532d-8023-4868-9d24-7a095d235937	a1bdf469-5010-453b-a554-a1fb2b1150de	2e606c16-d5e6-4e60-adaf-ef6d6a2a2981	0
9311f0f6-7153-46d3-abe1-efe5eb00190d	Cell_0_1	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	1
ac34c3d5-b6b0-4850-aae9-7c81d59746c1	Cell_0_2	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	2
7b996bf9-4872-413b-8f16-b842b809df15	Picture	t	4cbe9761-6894-43df-9794-1fbd03802ca5	21b749a8-3321-4a80-b263-aec4f216f56e	b03c6bb0-6fdd-4fbb-a919-37c4ee2625f7	\N	2
adaa2e2d-919c-4abf-a55d-7ddfbe6f3f8d	Picture	t	7beb8b44-0e70-4b33-98af-a9a827c6ff7f	d61256eb-0347-4e17-914e-7e932d465fba	b03c6bb0-6fdd-4fbb-a919-37c4ee2625f7	ad032b4f-c3e5-43cb-9978-cd32619a198f	2
369300b3-6ae8-4dd2-ae25-36a2b42e4fd8	Picture	t	8fca3b12-bcc0-49b7-a5e0-fcd0429bd417	7b996bf9-4872-413b-8f16-b842b809df15	b03c6bb0-6fdd-4fbb-a919-37c4ee2625f7	\N	2
6056eb6e-d3c3-4ed8-9a99-04b4ee2b4ef5	Y	t	8fca3b12-bcc0-49b7-a5e0-fcd0429bd417	570e180d-279d-4e12-8d92-7b6a585159c2	41b08c0c-ae32-4589-9272-a9e33477879a	\N	1
3b13822e-48d6-484f-a995-740ed0dac1fe	Y	f	5b3a2dfb-dcb1-45fb-8921-40f44e759754	\N	41b08c0c-ae32-4589-9272-a9e33477879a	\N	1
570e180d-279d-4e12-8d92-7b6a585159c2	Y	t	4cbe9761-6894-43df-9794-1fbd03802ca5	fb5e13f0-a17d-4db8-ab91-cb630c59e668	41b08c0c-ae32-4589-9272-a9e33477879a	\N	1
fb5e13f0-a17d-4db8-ab91-cb630c59e668	Y	t	f1202893-3507-4d5f-838c-4aacfbe616da	3b13822e-48d6-484f-a995-740ed0dac1fe	41b08c0c-ae32-4589-9272-a9e33477879a	\N	1
557670db-7707-4186-92ff-02faf45d2735	Strength	t	ef3f9bb0-6c4c-4c94-9f4b-2513f2669d7f	a8998988-52f7-4755-bd40-9dd796e479b0	75544b8f-0248-45d4-b77e-3622686b2bc9	\N	4
aa51ffc6-9c87-4a86-a419-cd7a19c348de	Y	t	16610855-bc0f-4c5b-9cc0-822104ba5246	0ecbc1fe-4f83-4bea-9b89-f34c59f79a23	41b08c0c-ae32-4589-9272-a9e33477879a	\N	1
0050a48c-dada-4b3a-afb5-6528a2d46141	Y	t	1ee6703e-add7-440b-9852-dd019782cc1e	5ec1edb5-165a-4eb0-a6d1-ddf8f88095c4	41b08c0c-ae32-4589-9272-a9e33477879a	\N	1
5ec1edb5-165a-4eb0-a6d1-ddf8f88095c4	Y	t	92c27b44-a319-462b-9994-fbab3782c1e0	570e180d-279d-4e12-8d92-7b6a585159c2	41b08c0c-ae32-4589-9272-a9e33477879a	\N	1
678862cc-0453-4d5f-9fa2-e21e47c711bf	Y	t	7beb8b44-0e70-4b33-98af-a9a827c6ff7f	5ec1edb5-165a-4eb0-a6d1-ddf8f88095c4	41b08c0c-ae32-4589-9272-a9e33477879a	\N	1
16fd5155-e668-424e-90f7-2aad473f63fe	Y	t	33158b80-8545-4c1e-8c6d-c94694106161	3b13822e-48d6-484f-a995-740ed0dac1fe	41b08c0c-ae32-4589-9272-a9e33477879a	\N	1
6535e8dc-8871-420f-9dbb-2d97c47f4bdb	Y	t	2962fbc1-147c-4049-b8c4-e044cfa8a671	6056eb6e-d3c3-4ed8-9a99-04b4ee2b4ef5	41b08c0c-ae32-4589-9272-a9e33477879a	\N	1
834d5ef1-9499-4c90-ba78-1e947a353504	Health	t	92c27b44-a319-462b-9994-fbab3782c1e0	bedf77ab-6718-4f92-a03d-4d245a02a6aa	36e69d89-acb0-4579-ac98-4571f28c407c	\N	3
49e23bce-6d7a-4757-a7c8-ea41b9e5319b	Strength	t	7beb8b44-0e70-4b33-98af-a9a827c6ff7f	c6804c3e-c91d-462f-ae27-d61e89f99091	75544b8f-0248-45d4-b77e-3622686b2bc9	\N	4
20d115a3-9e2e-494d-8c77-cb9dcbf43e7c	Result	t	63f25dd2-c3e4-4429-abfb-643b4c7165c2	8286c940-fa7c-4a22-8940-9a80bf16a461	a1bdf469-5010-453b-a554-a1fb2b1150de	c47fe03b-c048-46d0-b778-3d1ea21b0b9d	5
211e2a9c-124e-498d-bfa3-c412357145c2	Right	f	8cba83f7-dd30-4a7e-80bd-e959c269ab05	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	2
1475fa05-773f-4c30-a368-b8a3ec2cd5fe	Bottom	t	712b1247-d47e-47ab-a89c-d2730b01c884	37020090-6d81-456c-9ed3-30c9a7cab1f2	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	4
8286c940-fa7c-4a22-8940-9a80bf16a461	Result	t	f42602c6-3946-4a8f-abe3-091fbad526e7	1b9b2aa1-3e84-420e-bb57-1385b0cd7c87	a1bdf469-5010-453b-a554-a1fb2b1150de	c47fe03b-c048-46d0-b778-3d1ea21b0b9d	5
83e27bc1-7fb8-4b20-990b-c0a2c90f920c	Bottom	t	3618f087-0918-4cc7-9a01-8a82a4906b4c	433efba2-f658-4f04-be92-1f7bbe08b3df	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	4
37020090-6d81-456c-9ed3-30c9a7cab1f2	Bottom	f	8cba83f7-dd30-4a7e-80bd-e959c269ab05	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	4
34837939-80ae-4b27-877a-47a496b2e8c2	Left	t	f42602c6-3946-4a8f-abe3-091fbad526e7	6be70448-faca-4986-9b44-2706e7e7334c	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	1
6be70448-faca-4986-9b44-2706e7e7334c	Left	f	8cba83f7-dd30-4a7e-80bd-e959c269ab05	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	1
ac825925-4138-4279-9e6b-c18064da770e	Top	t	f42602c6-3946-4a8f-abe3-091fbad526e7	8cfdd1f5-df5c-404d-8001-783068f59f44	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	3
f534087d-3ecb-4a11-a4e7-edbed8f57269	Top	t	712b1247-d47e-47ab-a89c-d2730b01c884	8cfdd1f5-df5c-404d-8001-783068f59f44	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	3
18de8137-da19-4051-9f6a-7b3418ced384	Top	t	63f25dd2-c3e4-4429-abfb-643b4c7165c2	ac825925-4138-4279-9e6b-c18064da770e	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	3
d249319f-010a-4b50-a31f-2b14a036b508	Top	t	1c452e5a-d2ae-4275-b3c2-d7736f26957c	f534087d-3ecb-4a11-a4e7-edbed8f57269	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	3
e1c6bc93-c68d-4830-bf36-1855e90bdb76	Result	t	7d9d6812-63d9-44ea-a429-03ef61dacb3d	1b9b2aa1-3e84-420e-bb57-1385b0cd7c87	a1bdf469-5010-453b-a554-a1fb2b1150de	c47fe03b-c048-46d0-b778-3d1ea21b0b9d	5
c6804c3e-c91d-462f-ae27-d61e89f99091	Strength	t	92c27b44-a319-462b-9994-fbab3782c1e0	d665ba22-657c-4baa-91b1-02bf327351d9	75544b8f-0248-45d4-b77e-3622686b2bc9	\N	4
7add7b9b-5240-4fb1-b0eb-17b67e9dfc19	Y	t	ef3f9bb0-6c4c-4c94-9f4b-2513f2669d7f	6056eb6e-d3c3-4ed8-9a99-04b4ee2b4ef5	41b08c0c-ae32-4589-9272-a9e33477879a	\N	1
979832e2-be6e-4402-9717-dd42deb01c6a	Picture	t	3c864766-2f6a-4545-8cff-060413d22cd0	01716273-5edf-4fc7-b9a6-52d64933c252	b03c6bb0-6fdd-4fbb-a919-37c4ee2625f7	\N	2
636672c1-4f1a-42fb-9d67-69d9d7bf3d4c	Y	t	3bec3d4a-7716-4308-b7e3-69308c70994a	fb5e13f0-a17d-4db8-ab91-cb630c59e668	41b08c0c-ae32-4589-9272-a9e33477879a	\N	1
0ecbc1fe-4f83-4bea-9b89-f34c59f79a23	Y	t	120de4fd-defd-4575-84a3-94507ee6b3ac	636672c1-4f1a-42fb-9d67-69d9d7bf3d4c	41b08c0c-ae32-4589-9272-a9e33477879a	\N	1
c8a5e789-60ea-40f8-ae23-c4ef8bd97b40	Y	t	3c864766-2f6a-4545-8cff-060413d22cd0	0ecbc1fe-4f83-4bea-9b89-f34c59f79a23	41b08c0c-ae32-4589-9272-a9e33477879a	\N	1
a671cf9d-2776-43b9-bb4b-8866b408e74d	Health	t	ef3f9bb0-6c4c-4c94-9f4b-2513f2669d7f	0798f1f7-9c55-4862-9664-2e574db5e9b7	36e69d89-acb0-4579-ac98-4571f28c407c	\N	3
bedf77ab-6718-4f92-a03d-4d245a02a6aa	Health	f	4cbe9761-6894-43df-9794-1fbd03802ca5	\N	36e69d89-acb0-4579-ac98-4571f28c407c	\N	3
1185a4c7-7bed-4b73-a10a-cfae2a3204b2	Health	t	16610855-bc0f-4c5b-9cc0-822104ba5246	cc355c49-8a9b-4761-b53f-5cba9ceff642	36e69d89-acb0-4579-ac98-4571f28c407c	\N	3
f7bde5b2-5084-49b3-923d-b7053cdf9250	Health	t	3c864766-2f6a-4545-8cff-060413d22cd0	cc355c49-8a9b-4761-b53f-5cba9ceff642	36e69d89-acb0-4579-ac98-4571f28c407c	\N	3
27a053ea-9766-4cad-aecb-93164a7b76c1	Color	t	92c27b44-a319-462b-9994-fbab3782c1e0	0174b77e-b8fd-48cb-8de4-f11b68dcd162	7601554e-1721-4775-a136-25710f4abe65	\N	5
e32c417a-862e-44de-b77c-a96348a415a8	Color	t	1ee6703e-add7-440b-9852-dd019782cc1e	27a053ea-9766-4cad-aecb-93164a7b76c1	7601554e-1721-4775-a136-25710f4abe65	3d0069be-f580-4208-9690-275b5e05d457	5
8fb8036c-58cb-428a-b2d8-9cc3a545a769	Color	t	ef3f9bb0-6c4c-4c94-9f4b-2513f2669d7f	46277bfb-951f-434e-ab98-44113c60d9e8	7601554e-1721-4775-a136-25710f4abe65	3d0069be-f580-4208-9690-275b5e05d457	5
0792b250-1516-48ba-89e6-c089d9fac040	Picture	t	2962fbc1-147c-4049-b8c4-e044cfa8a671	369300b3-6ae8-4dd2-ae25-36a2b42e4fd8	b03c6bb0-6fdd-4fbb-a919-37c4ee2625f7	431656c1-6a08-425d-856c-570e7c81da39	2
b4eeb718-d505-41ae-9d5d-b0a6e42514a6	Cell_0_5	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	5
dce9b9ca-fa2e-4f92-9d3c-3441fefb2b27	Cell_1_0	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	6
da5c57ac-b57c-4254-a5d0-41bdfe163248	Cell_0_3	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	3
810a1c68-cb1c-4060-9bda-6afa6cfd5b90	Cell_2_2	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	14
0b88cbc3-bc7a-48be-810c-c44950e28c2f	Cell_1_4	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	10
78bc3d83-a1a0-480e-a298-9a6347cea8ef	Cell_1_1	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	7
9aabe57c-19b7-42da-a373-467a89670496	Cell_2_3	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	15
d6d74171-da99-4873-b07d-90865fab0fbb	Cell_2_4	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	16
ee6afd89-3552-445e-81ff-5e45229b8bb7	Cell_2_5	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	17
7a5bee07-4058-4f63-ba1c-468e1935a275	Cell_3_1	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	19
4aeb091c-ca1a-4d38-a38c-647b115b4996	Cell_1_2	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	8
41fe696a-ff77-4546-b195-d5ceaa9284cb	Cell_1_3	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	9
f31f0439-a6b3-4028-aaf3-4a409a25368b	Cell_3_0	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	18
fbc162f7-682a-4be5-bcb7-143460e98dde	Bottom	t	f499a0f4-11a3-40fa-8b4b-c8e31c0b0365	d88a9974-b6ff-415c-9d27-9c9b4ef34e19	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	4
e303cb90-5326-43c5-a85c-5a798e693cc5	Result	t	f499a0f4-11a3-40fa-8b4b-c8e31c0b0365	8286c940-fa7c-4a22-8940-9a80bf16a461	a1bdf469-5010-453b-a554-a1fb2b1150de	c47fe03b-c048-46d0-b778-3d1ea21b0b9d	5
7ce01b7c-5681-4c25-a5a7-8d2d9662e0a4	Agent	t	d7b65df6-1396-48de-87c4-9e53693664cf	e0a23c8d-57a8-423d-82bf-07d564c886ab	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	0
0c0be83f-b204-4406-9d20-93a5a881310b	Down	f	d7b65df6-1396-48de-87c4-9e53693664cf	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	558fd008-34eb-441c-9604-d6dcfb9c839a	1
359f1baf-ff63-4434-aa29-cfbc463a3a5b	Step Down	f	d7b65df6-1396-48de-87c4-9e53693664cf	\N	41b08c0c-ae32-4589-9272-a9e33477879a	\N	2
fc01229d-2073-42e8-81e5-aff3e6afa404	Agent	t	58c168db-813c-4bc9-99f7-667f00a8ded2	e0a23c8d-57a8-423d-82bf-07d564c886ab	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	0
095ed9fd-c739-43f0-b323-340929e2ad81	Left	f	58c168db-813c-4bc9-99f7-667f00a8ded2	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	558fd008-34eb-441c-9604-d6dcfb9c839a	1
0e259b32-365e-49e8-92c8-8ff072a43a64	Step Left	f	58c168db-813c-4bc9-99f7-667f00a8ded2	\N	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	\N	2
d8b2ee0c-6011-4a32-bd5a-aa22885cd5f6	Agent	t	66ea626b-bc79-441a-a2d4-3f5b2c72a180	e0a23c8d-57a8-423d-82bf-07d564c886ab	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	0
30e75ee4-3c66-47a7-bd9e-b03ec194da6b	Right	f	66ea626b-bc79-441a-a2d4-3f5b2c72a180	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	558fd008-34eb-441c-9604-d6dcfb9c839a	1
f3e6d4b6-5559-4d70-be5d-ebd025a30100	Step Right	f	66ea626b-bc79-441a-a2d4-3f5b2c72a180	\N	3f336d1f-4622-4ff9-9fe7-d28e8f527a82	\N	2
beeae03e-6707-42e6-8497-ca1753eb6f47	Agent	t	e5da8b2b-6347-4661-a531-351f4b487e99	515fcb04-ab09-4c23-b2c4-402c742db474	a1bdf469-5010-453b-a554-a1fb2b1150de	0af4bb53-e137-46d7-b2ad-ce3df2eedb5a	0
dfb5d46e-b601-4d5a-bbca-4b48b347ae5b	Left	t	e5da8b2b-6347-4661-a531-351f4b487e99	34837939-80ae-4b27-877a-47a496b2e8c2	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	1
2be5fbf0-f44b-47c8-8817-dfc712d94fba	Right	t	e5da8b2b-6347-4661-a531-351f4b487e99	2c89b0b4-a5b0-4ff8-ba9b-b9f564cb8f0b	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	2
f9c9a503-25ad-4282-8263-6cbe02f98ca0	Result	t	e5da8b2b-6347-4661-a531-351f4b487e99	8286c940-fa7c-4a22-8940-9a80bf16a461	a1bdf469-5010-453b-a554-a1fb2b1150de	c47fe03b-c048-46d0-b778-3d1ea21b0b9d	5
eb19d6fa-6d1b-4aed-b9ef-0472157e2294	Bottom	t	e5da8b2b-6347-4661-a531-351f4b487e99	d88a9974-b6ff-415c-9d27-9c9b4ef34e19	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	4
6a8f7f01-a598-40a2-ad55-53a206e73e2c	Top	t	e5da8b2b-6347-4661-a531-351f4b487e99	ac825925-4138-4279-9e6b-c18064da770e	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	3
237847cc-7e0f-4461-9f67-007ccd9f1983	Left	t	09d758a8-7390-4e00-8e3c-de3e632b089d	34837939-80ae-4b27-877a-47a496b2e8c2	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	1
da1572ed-03b2-43b7-a0e7-883b5e0f468a	Right	t	09d758a8-7390-4e00-8e3c-de3e632b089d	2c89b0b4-a5b0-4ff8-ba9b-b9f564cb8f0b	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	2
99bf5aa1-a117-4682-a2d9-aa38a3ee2fa3	Agent	t	09d758a8-7390-4e00-8e3c-de3e632b089d	515fcb04-ab09-4c23-b2c4-402c742db474	a1bdf469-5010-453b-a554-a1fb2b1150de	0af4bb53-e137-46d7-b2ad-ce3df2eedb5a	0
7a210765-1bf3-455d-946e-de8035b4a27e	Cell_0_4	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	4
06dfe1f0-7493-41a9-8ea2-622c6ad35588	Cell_1_5	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	11
5d48b247-e879-41f8-9989-306645720e9c	Bottom	t	09d758a8-7390-4e00-8e3c-de3e632b089d	d88a9974-b6ff-415c-9d27-9c9b4ef34e19	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	4
947c2600-8b1a-46ee-94d5-25296d63681f	Result	t	09d758a8-7390-4e00-8e3c-de3e632b089d	8286c940-fa7c-4a22-8940-9a80bf16a461	a1bdf469-5010-453b-a554-a1fb2b1150de	c47fe03b-c048-46d0-b778-3d1ea21b0b9d	5
24ddb5ad-82b2-4073-bcd6-eaf2bc57d3cb	Cell_4_5	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	29
36fe089a-181c-4fbe-93f6-9aaf090914d9	Cell_3_3	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	21
8f470c47-7683-45ff-9bae-a8172a265b20	Cell_3_5	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	23
a1221e07-c986-4147-a1b2-d797ebacb57f	Cell_5_2	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	32
a2d21e57-d599-4f76-8179-22263ba988e6	Cell_4_0	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	24
baa696ac-014e-4b40-a2d0-827417cb1e87	Cell_5_0	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	30
1cafb308-2217-4c3c-bede-24e5c2f3311b	Cell_5_1	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	31
ec4d1204-7e0d-4416-84f1-952e2b5c6c16	Cell_5_4	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	34
d0caa33c-f989-49bf-969d-5c179e20d420	Cell_4_3	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	27
e68ce057-fb0e-43c1-81b7-06e61ab840ad	Cell_4_1	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	25
fb80c5d4-53cb-4c54-84e8-9d1982143bdd	Cell_4_4	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	28
9c0fbee0-d7ba-4fb5-ad5c-7e4fe0fa3014	Cell_5_5	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	35
beb6ac86-d542-482a-85a5-0fa0e805efad	Cell_3_2	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	20
894211cb-3179-471b-bb14-961cf2d9f2a3	Cell_3_4	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	22
82c2cec9-6b8a-4ab4-90b3-9650efbe5cb0	Cell_5_3	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	33
a773bbd2-c70d-4e13-8baa-f682251ccd2f	Cell_4_2	f	9a7d38d9-399a-4ba9-ad36-a0252b435d53	\N	a1bdf469-5010-453b-a554-a1fb2b1150de	\N	26
19216968-9926-471f-a074-e55c54752b96	Top	t	09d758a8-7390-4e00-8e3c-de3e632b089d	ac825925-4138-4279-9e6b-c18064da770e	a1bdf469-5010-453b-a554-a1fb2b1150de	20901781-44bf-4571-9886-96826c847d5f	3
\.


--
-- Name: __EFMigrationsHistory pk___ef_migrations_history; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT pk___ef_migrations_history PRIMARY KEY (migration_id);


--
-- Name: domain_values pk_domain_values; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domain_values
    ADD CONSTRAINT pk_domain_values PRIMARY KEY (id);


--
-- Name: domains pk_domains; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domains
    ADD CONSTRAINT pk_domains PRIMARY KEY (id);


--
-- Name: frame_bases pk_frame_bases; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.frame_bases
    ADD CONSTRAINT pk_frame_bases PRIMARY KEY (id);


--
-- Name: frames pk_frames; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.frames
    ADD CONSTRAINT pk_frames PRIMARY KEY (id);


--
-- Name: positions pk_positions; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.positions
    ADD CONSTRAINT pk_positions PRIMARY KEY (id);


--
-- Name: productions pk_productions; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productions
    ADD CONSTRAINT pk_productions PRIMARY KEY (id);


--
-- Name: slots pk_slots; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slots
    ADD CONSTRAINT pk_slots PRIMARY KEY (id);


--
-- Name: ix_domain_values_domain_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_domain_values_domain_id ON public.domain_values USING btree (domain_id);


--
-- Name: ix_domain_values_value_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_domain_values_value_id ON public.domain_values USING btree (value_id);


--
-- Name: ix_domains_frame_base_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_domains_frame_base_id ON public.domains USING btree (frame_base_id);


--
-- Name: ix_frames_frame_base_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_frames_frame_base_id ON public.frames USING btree (frame_base_id);


--
-- Name: ix_frames_parent_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_frames_parent_id ON public.frames USING btree (parent_id);


--
-- Name: ix_frames_position_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_frames_position_id ON public.frames USING btree (position_id);


--
-- Name: ix_productions_slot_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_productions_slot_id ON public.productions USING btree (slot_id);


--
-- Name: ix_slots_domain_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_slots_domain_id ON public.slots USING btree (domain_id);


--
-- Name: ix_slots_owner_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_slots_owner_id ON public.slots USING btree (owner_id);


--
-- Name: ix_slots_parent_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_slots_parent_id ON public.slots USING btree (parent_id);


--
-- Name: ix_slots_value_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_slots_value_id ON public.slots USING btree (value_id);


--
-- Name: domain_values fk_domain_values_domains_domain_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domain_values
    ADD CONSTRAINT fk_domain_values_domains_domain_id FOREIGN KEY (domain_id) REFERENCES public.domains(id) ON DELETE CASCADE;


--
-- Name: domain_values fk_domain_values_frames_value_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domain_values
    ADD CONSTRAINT fk_domain_values_frames_value_id FOREIGN KEY (value_id) REFERENCES public.frames(id) ON DELETE CASCADE;


--
-- Name: domains fk_domains_frame_bases_frame_base_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domains
    ADD CONSTRAINT fk_domains_frame_bases_frame_base_id FOREIGN KEY (frame_base_id) REFERENCES public.frame_bases(id) ON DELETE CASCADE;


--
-- Name: frames fk_frames_frame_bases_frame_base_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.frames
    ADD CONSTRAINT fk_frames_frame_bases_frame_base_id FOREIGN KEY (frame_base_id) REFERENCES public.frame_bases(id) ON DELETE CASCADE;


--
-- Name: frames fk_frames_frames_parent_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.frames
    ADD CONSTRAINT fk_frames_frames_parent_id FOREIGN KEY (parent_id) REFERENCES public.frames(id) ON DELETE SET NULL;


--
-- Name: frames fk_frames_positions_position_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.frames
    ADD CONSTRAINT fk_frames_positions_position_id FOREIGN KEY (position_id) REFERENCES public.positions(id) ON DELETE CASCADE;


--
-- Name: productions fk_productions_slots_slot_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productions
    ADD CONSTRAINT fk_productions_slots_slot_id FOREIGN KEY (slot_id) REFERENCES public.slots(id) ON DELETE CASCADE;


--
-- Name: slots fk_slots_domain_values_value_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slots
    ADD CONSTRAINT fk_slots_domain_values_value_id FOREIGN KEY (value_id) REFERENCES public.domain_values(id) ON DELETE SET NULL;


--
-- Name: slots fk_slots_domains_domain_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slots
    ADD CONSTRAINT fk_slots_domains_domain_id FOREIGN KEY (domain_id) REFERENCES public.domains(id) ON DELETE SET NULL;


--
-- Name: slots fk_slots_frames_owner_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slots
    ADD CONSTRAINT fk_slots_frames_owner_id FOREIGN KEY (owner_id) REFERENCES public.frames(id) ON DELETE CASCADE;


--
-- Name: slots fk_slots_slots_parent_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slots
    ADD CONSTRAINT fk_slots_slots_parent_id FOREIGN KEY (parent_id) REFERENCES public.slots(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

