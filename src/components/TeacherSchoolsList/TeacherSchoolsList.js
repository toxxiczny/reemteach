import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import { compose } from 'redux'
import { withMenu } from '@hoc'

import APDashboard from '@components/AdminProfile/styled/Dashboard'
import AHTLDashboard from '@components/AdminHeadTeachersList/styled/Dashboard'

import HTPComposed from '@components/HeadTeacherProfile/composed'

import { delayedApiAxios } from '@utils'

const TeacherSchoolsListContainer = styled(APDashboard.Container)`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const TeacherSchoolsList = ({ shouldMenuAppear }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [schools, setSchools] = useState([])
    useEffect(() => {
        const getSchools = async () => {
            const url = '/api/teacher/getSchools'
            const response = await delayedApiAxios.get(url)
            if (response) {
                setIsLoading(false)
                const { schools } = response.data
                setSchools(schools)
            }
        }
        getSchools()
    }, [])
    return (
        <TeacherSchoolsListContainer withMenu={shouldMenuAppear} withMorePadding>
            {!isLoading && (
                <AHTLDashboard.DetailsContainer>
                    {schools.map(
                        ({
                            headTeacher,
                            email,
                            id,
                            name,
                            type,
                            description,
                            address,
                            creationDate
                        }) => {
                            return (
                                <div key={id}>
                                    <HTPComposed.Detail label="Dyrektor" value={headTeacher} />
                                    <HTPComposed.Detail label="E-mail" value={email} />
                                    <HTPComposed.Detail label="Nazwa szkoły" value={name} />
                                    <HTPComposed.Detail label="Rodzaj szkoły" value={type} />
                                    <HTPComposed.Detail label="Opis szkoły" value={description} />
                                    <HTPComposed.Detail label="Adres szkoły" value={address} />
                                    <HTPComposed.Detail
                                        label="Data utworzenia szkoły"
                                        value={creationDate}
                                    />
                                </div>
                            )
                        }
                    )}
                </AHTLDashboard.DetailsContainer>
            )}
        </TeacherSchoolsListContainer>
    )
}

export default compose(withMenu)(TeacherSchoolsList)