--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)

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
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_email text NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    user_email text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 'joao@driven.com.br', '26d6c622-f1c9-4721-b67c-766b37ff8a20', '2023-05-21 15:29:27.187847');
INSERT INTO public.sessions VALUES (2, 'joao@driven.com.br', 'bb6854de-a2cf-4d78-91fe-30d13a289d72', '2023-05-21 15:33:40.911905');
INSERT INTO public.sessions VALUES (3, 'joao@driven.com.br', '20bfa3f5-7c62-4639-b0d6-ab4661d79cba', '2023-05-21 15:35:03.276622');
INSERT INTO public.sessions VALUES (4, 'joao@driven.com.br', '21be6ef6-9bb4-47c4-9227-2f257d2cbaef', '2023-05-21 15:38:00.731855');
INSERT INTO public.sessions VALUES (5, 'joao@driven.com.br', '6c37fdb2-7b34-4d90-aee1-1e038b8e9886', '2023-05-21 15:42:00.251716');
INSERT INTO public.sessions VALUES (6, 'joao@driven.com.br', '30b8a6ed-04b1-43cb-a77b-12efe5bcc64a', '2023-05-21 15:48:50.178146');
INSERT INTO public.sessions VALUES (7, 'joao@driven.com.br', 'd6622f9e-6589-4c90-ba15-c95ce7bfa451', '2023-05-21 15:51:08.92014');
INSERT INTO public.sessions VALUES (8, 'joao@driven.com.br', 'cb37cd0b-2b80-4067-9d1b-9134a1b8f66c', '2023-05-21 15:52:53.977719');
INSERT INTO public.sessions VALUES (9, 'joao@driven.com.br', 'bc2e7b90-64cb-41ae-8d21-aceb0f0d7f9d', '2023-05-21 15:53:35.612471');
INSERT INTO public.sessions VALUES (10, 'joao@driven.com.br', 'dcf29b9c-a62e-45f6-b113-5c4684056428', '2023-05-21 15:56:51.78121');
INSERT INTO public.sessions VALUES (11, 'joao@driven.com.br', 'aa5e0331-481c-4e2a-884a-dd3a6c6b6813', '2023-05-21 15:59:50.310977');
INSERT INTO public.sessions VALUES (12, 'joao@driven.com.br', '88cc1a8d-6e7a-4183-bf8f-e425f360cc0a', '2023-05-21 16:00:47.091568');
INSERT INTO public.sessions VALUES (13, 'joao@driven.com.br', 'bc75ad8c-d194-47e1-a8e5-96da80405935', '2023-05-21 16:07:19.371741');
INSERT INTO public.sessions VALUES (14, 'joao@driven.com.br', '265a1d20-f3a7-4bf0-8ebd-344e0eafad20', '2023-05-21 16:08:42.185043');
INSERT INTO public.sessions VALUES (15, 'joao@driven.com.br', '3bb689b4-bd17-46dd-9f54-ff2ee44be2c5', '2023-05-21 16:09:29.630313');
INSERT INTO public.sessions VALUES (16, 'joao@driven.com.br', '8f0ecb16-5368-43e8-8dda-5728754d4120', '2023-05-21 16:09:59.11734');
INSERT INTO public.sessions VALUES (17, 'joao@driven.com.br', 'bebe5f5e-3a43-46c6-ba6d-2fe4512502f2', '2023-05-21 16:10:23.161478');
INSERT INTO public.sessions VALUES (18, 'joao@driven.com.br', '714f7ce7-a52a-44ad-b83f-cb9a2b509570', '2023-05-21 16:12:01.598554');
INSERT INTO public.sessions VALUES (19, 'joao@driven.com.br', 'bdcaf361-f1ae-4d17-ba94-a5178f86f945', '2023-05-21 16:20:01.285023');
INSERT INTO public.sessions VALUES (20, 'joao@driven.com.br', '24c5aded-4b9a-41bf-b581-1d4595b1f655', '2023-05-21 16:21:00.741452');
INSERT INTO public.sessions VALUES (21, 'joao@driven.com.br', 'f11b464b-9e07-4b28-8e06-b9db191eb568', '2023-05-21 17:15:39.326123');
INSERT INTO public.sessions VALUES (22, 'joao@driven.com.br', '50335674-48e8-4460-8c5b-f1c5266b855d', '2023-05-21 17:17:12.021152');
INSERT INTO public.sessions VALUES (23, 'joao@driven.com.br', '6de1682f-92e6-4adb-9f24-2dc4f6441a5c', '2023-05-21 17:22:04.791241');
INSERT INTO public.sessions VALUES (24, 'joao@driven.com.br', 'ce24927e-19ac-4658-9e85-d3f388b901e0', '2023-05-21 17:35:09.136671');
INSERT INTO public.sessions VALUES (25, 'joao@driven.com.br', '6999c427-d23f-4ed4-9330-d178e497db9f', '2023-05-21 17:40:16.976359');
INSERT INTO public.sessions VALUES (26, 'joao@driven.com.br', '446bb185-96f7-4926-95b9-4ed26d219f68', '2023-05-21 18:14:26.247083');
INSERT INTO public.sessions VALUES (27, 'joao@driven.com.br', '59921471-2a3b-4f3b-8026-3a50176d21d3', '2023-05-21 18:31:20.523845');
INSERT INTO public.sessions VALUES (28, 'joao@driven.com.br', '47f295da-c216-415b-9c44-09603ed66571', '2023-05-21 18:36:26.636076');
INSERT INTO public.sessions VALUES (29, 'maria@driven.com.br', '6a12126c-e242-49fc-9367-c6726ad5f1a5', '2023-05-21 20:06:46.063234');
INSERT INTO public.sessions VALUES (30, 'maria2@driven.com.br', 'c086b267-e3c5-4cee-961f-c3d706321289', '2023-05-21 20:08:59.742569');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (3, 'https://...', 'RoQTsFjv', 'joao@driven.com.br', 0, '2023-05-21 20:13:48.419298');
INSERT INTO public.urls VALUES (2, 'https://...', 'ia8Ur1BC', 'joao@driven.com.br', 1, '2023-05-21 20:13:48.419298');
INSERT INTO public.urls VALUES (4, 'https://...', 'qPmjybT5', 'joao@driven.com.br', 1, '2023-05-21 20:13:48.419298');
INSERT INTO public.urls VALUES (5, 'https://www.google.com/search?q=raposa&client=ubuntu&hs=L1G&channel=fs&sxsrf=APwXEdfvm-Ff1zfVYTJQ3PtM30PjbQVs3g:1684710440415&source=lnms&tbm=isch&sa=X&ved=2ahUKEwilr-a6w4f_AhUArJUCHUHPDycQ_AUoAXoECAEQAw&biw=1848&bih=968&dpr=1#imgrc=YmllAsdde4C6tM', 'r0lwcOHw', 'maria@driven.com.br', 2, '2023-05-21 20:13:48.419298');
INSERT INTO public.urls VALUES (6, 'https://www.google.com/search?q=raposa&client=ubuntu&hs=L1G&channel=fs&sxsrf=APwXEdfvm-Ff1zfVYTJQ3PtM30PjbQVs3g:1684710440415&source=lnms&tbm=isch&sa=X&ved=2ahUKEwilr-a6w4f_AhUArJUCHUHPDycQ_AUoAXoECAEQAw&biw=1848&bih=968&dpr=1#imgrc=YmllAsdde4C6tM', 'szchRV7T', 'maria2@driven.com.br', 1, '2023-05-21 20:13:48.419298');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'João', 'joao@driven.com.br', '$2b$10$FVLMrb0803Eoe1Tgx83w7.7wtkyjf8GeMT/ZAnzP5e.tfLrrajreq', '2023-05-21 15:02:49.912663');
INSERT INTO public.users VALUES (2, 'João', 'maria@driven.com.br', '$2b$10$E9tz5DJm/7tyoNUQWQlKBOEFk.rkuB1AVzpLtc39ck6D5xluKSuGO', '2023-05-21 20:06:43.172474');
INSERT INTO public.users VALUES (3, 'maria', 'maria2@driven.com.br', '$2b$10$dfkaqG0WBbNykARCAsqAQu/lfwm1MEvGenpuejzW4FtgMh8mbqu9C', '2023-05-21 20:08:52.32583');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 30, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_user_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_email_fkey FOREIGN KEY (user_email) REFERENCES public.users(email);


--
-- Name: urls urls_user_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_user_email_fkey FOREIGN KEY (user_email) REFERENCES public.users(email);


--
-- PostgreSQL database dump complete
--

