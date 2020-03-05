import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import { compose } from 'redux'
import { withSocket, withMenu } from '@hoc'

import APDashboard from '@components/AdminProfile/styled/Dashboard'
import AHTLDashboard from '@components/AdminHeadTeachersList/styled/Dashboard'
import AHTCForm from '@components/AdminHeadTeacherCreator/styled/Form'

import HTPComposed from '@components/HeadTeacherProfile/composed'
import Composed from './composed'

import { setFeedbackData } from '@utils'

const StudentLecturesListContainer = styled(APDashboard.Container)`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const StudentLecturesList = ({ socket, shouldMenuAppear }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [lectures, setLectures] = useState([])
    useEffect(() => {
        socket.emit('getLectures', lectures => {
            setIsLoading(false)
            setLectures(lectures)
        })
        socket.on('updateLectures', updatedLectures => setLectures(updatedLectures))
        return () => socket.removeListener('updateLectures')
    }, [])
    useEffect(() => {
        socket.on('breakLecture', socketId =>
            setLectures(lectures.filter(lecture => lecture.socketId !== socketId))
        )
        return () => socket.removeListener('breakLecture')
    }, [lectures])
    const joinLecture = async lecturerRoom => {
        try {
            socket.emit('joinLecture', lecturerRoom)
            updateLectures(lecturerRoom, true)
        } catch (error) {
            setFeedbackData('Wystąpił niespodziewany problem podczas dołączania do wykładu!', 'Ok')
        }
    }
    const updateLectures = (lecturerRoom, shouldLecturePopupAppear) => {
        setLectures(
            lectures.map(lecture =>
                lecture.lecturerRoom === lecturerRoom
                    ? {
                          ...lecture,
                          shouldLecturePopupAppear
                      }
                    : lecture
            )
        )
    }
    return (
        <StudentLecturesListContainer withMenu={shouldMenuAppear} withMorePadding>
            {lectures.map(({ lecturerId, lecturerRoom, shouldLecturePopupAppear }) => (
                <Composed.LecturePopup
                    key={lecturerId}
                    onClick={() => updateLectures(lecturerRoom, false)}
                    shouldSlideIn={shouldLecturePopupAppear}
                />
            ))}
            {!isLoading && (
                <AHTLDashboard.DetailsContainer>
                    {lectures.length > 0 ? (
                        lectures.map(({ lecturerId, lecturer, lecturerRoom }) => (
                            <div key={lecturerId}>
                                <HTPComposed.Detail label="Wykładowca" value={lecturer} />
                                <AHTCForm.Submit
                                    onClick={() => joinLecture(lecturerRoom)}
                                    withLessMargin
                                >
                                    Dołącz
                                </AHTCForm.Submit>
                            </div>
                        ))
                    ) : (
                        <AHTLDashboard.Warning>
                            Aktualnie nie jest prowadzony żaden wykład!
                        </AHTLDashboard.Warning>
                    )}
                </AHTLDashboard.DetailsContainer>
            )}
        </StudentLecturesListContainer>
    )
}

export default compose(withSocket, withMenu)(StudentLecturesList)