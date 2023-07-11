import { useEffect, useRef, useState } from "react";

export const useEvents = (getEventsListResponse) => {
    const prevEventsListResRef = useRef(getEventsListResponse);
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        if (getEventsListResponse !== prevEventsListResRef.current && getEventsListResponse.success && getEventsListResponse?.data?.length > 0) {
            prevEventsListResRef.current = getEventsListResponse;
            setEventList(getEventsListResponse?.data)
            // console.log('useEvents => ', eventList)
        }
    }, [getEventsListResponse])

    return eventList;
};

export const useUpcomingEvents = (getUpcomingEventsListResponse) => {
    const prevGetUpcomingEventsListResRef = useRef(getUpcomingEventsListResponse);
    const [upcomingEventList, setUpcomingEventList] = useState([]);


    useEffect(() => {
        if (getUpcomingEventsListResponse !== prevGetUpcomingEventsListResRef.current && getUpcomingEventsListResponse.success && getUpcomingEventsListResponse?.data?.length > 0) {
            prevGetUpcomingEventsListResRef.current = getUpcomingEventsListResponse;
            setUpcomingEventList(getUpcomingEventsListResponse?.data)
            // console.log('useEvents => ', eventList)
        }
    }, [getUpcomingEventsListResponse])

    return upcomingEventList;
};

export const usePosts = (getPostsListResponse) => {
    const prevPostsListResRef = useRef(getPostsListResponse);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        if (getPostsListResponse !== prevPostsListResRef.current && getPostsListResponse.success && getPostsListResponse?.data?.length > 0) {
            prevPostsListResRef.current = getPostsListResponse;
            setPostList(getPostsListResponse?.data)
            // console.log('usePosts => ', postList)
        }
    }, [getPostsListResponse])

    return postList;
};

export const useSermons = (getSermonsListResponse) => {
    const prevSermonsListResponseRef = useRef(getSermonsListResponse);
    const [sermonsList, setSermonslist] = useState([]);

    useEffect(() => {
        if (getSermonsListResponse !== prevSermonsListResponseRef.current && getSermonsListResponse.success && getSermonsListResponse?.data?.length > 0) {
            prevSermonsListResponseRef.current = getSermonsListResponse;
            setSermonslist(getSermonsListResponse?.data)
            // console.log('useSermons => ', sermonsList)
        }
    }, [getSermonsListResponse])

    return sermonsList;
};

export const useSpeaker = (getOurSpeakersListResponse) => {
    const prevOurSpeakerListResponseRef = useRef(getOurSpeakersListResponse);
    const [ourSpeakersList, setOurSpeakersList] = useState([]);

    useEffect(() => {
        if (getOurSpeakersListResponse !== prevOurSpeakerListResponseRef.current && getOurSpeakersListResponse.success && getOurSpeakersListResponse?.data?.length > 0) {
            prevOurSpeakerListResponseRef.current = getOurSpeakersListResponse;
            setOurSpeakersList(getOurSpeakersListResponse?.data)
            // console.log('useSpeaker => ', ourSpeakersList)
        }
    }, [getOurSpeakersListResponse])

    return ourSpeakersList;
};

export const useStaff = (getOurStaffListResponse) => {
    const prevOurStaffListResponseResponseRef = useRef(getOurStaffListResponse);
    const [ourStaffList, setOurStaffList] = useState([]);

    useEffect(() => {
        if (getOurStaffListResponse !== prevOurStaffListResponseResponseRef.current && getOurStaffListResponse.success && getOurStaffListResponse?.data?.length > 0) {
            prevOurStaffListResponseResponseRef.current = getOurStaffListResponse;
            setOurStaffList(getOurStaffListResponse?.data)
            // console.log('useStaff => ', ourStaffList)
        }
    }, [getOurStaffListResponse])

    return ourStaffList;
};

export const useHomeBanner = (getHomeBannerResponse) => {
    const prevHomeBannerListResponseResponseRef = useRef(getHomeBannerResponse);
    const [homeBannerList, setHomeBannerList] = useState([]);

    useEffect(() => {
        if (getHomeBannerResponse !== prevHomeBannerListResponseResponseRef.current && getHomeBannerResponse.success && getHomeBannerResponse?.data?.length > 0) {
            prevHomeBannerListResponseResponseRef.current = getHomeBannerResponse;
            setHomeBannerList(getHomeBannerResponse?.data)
            // console.log('useHomeBanner => ', homeBannerList)
        }
    }, [getHomeBannerResponse])

    return homeBannerList;
};

