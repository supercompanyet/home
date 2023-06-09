import React, { useState } from 'react';
import { FormValuesType } from '@customTypes/FormValuesType';
import mapIcon from '@images/map-icon.svg';
import { Header } from '@patterns/Header';
import { supabase } from '@services/supabase';
import * as C from '@styles/house';
import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { Carousel } from '@components/Carousel';
import { Fieldset } from '@components/Fieldset';
import defaultUserImage from '@images/default-user-image.svg';
import phoneIcon from '@images/phone-icon.svg';
import emailIcon from '@images/email-icon.svg';
import { LatLngLiteral } from 'leaflet';
import dynamic from 'next/dynamic';
import { interiorFeatures, externalFeatures } from '@utils/formCheckboxes';
import Head from 'next/head';
import { formOptions } from '@utils/formOptions';
import { Footer } from '@patterns/Footer';

type PositionNull = {
    lat: null;
    lng: null;
}

interface HouseType extends FormValuesType {
    images: string[];
    photo_url: string;
    latlng: LatLngLiteral;
}

type Props = {
    data: HouseType | undefined;
}

const DynamicMap = dynamic(
    () => import('@components/AdMap'),
    { ssr: false }
)

export default function House({ data }: Props) {
    const [showPhone, setShowPhone] = useState(false);
    function copyText(text: string) {
        if (navigator.clipboard)
            navigator.clipboard.writeText(text);
    }

    function getStringOption(array: string[][], option: string) {
        let op = '';
        array.map(arr => {
            if (arr.indexOf(option) > -1) op = arr[0];
        })
        return op
    }

    return (
        <>
            <Head>
                <title>Fasthome | {data?.title ?? "House"}</title>
                <meta name="description" content={data?.explanation} />
            </Head>
            <Header />
            {
                data ? (
                    <C.Container>
                        <C.Title>
                            <div>
                                <h1>{data.title}</h1>
                                <div className="address">
                                    <Image
                                        src={mapIcon}
                                        alt="map icon"
                                        width={25}
                                        height={25} />
                                    <p>{data.address}</p>
                                </div>
                            </div>
                            <div>
                                <h2>{data.price.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}</h2>
                            </div>
                        </C.Title>
                        <C.Content>
                            <Carousel
                                images={data.images.map(url => ({ preview: url }))}
                                thumbs
                            />
                            <Fieldset title='General Information'>
                                <C.GenInfoGrid>
                                    <p>Published Date</p>
                                    <p>{new Date(data.created_at).toLocaleDateString()}</p>
                                    <p>Floor Location</p>
                                    <p>{data.floor_location}</p>
                                    <p>Advertise Status</p>
                                    <p>{getStringOption(formOptions.sale, data.sale)}</p>
                                    <p>Furnished</p>
                                    <p>{getStringOption(formOptions.furnished, data.furnished)}</p>
                                    <p>Housing Shape</p>
                                    <p>{getStringOption(formOptions.housing, data.housing)}</p>
                                    <p>Dues</p>
                                    <p>{data.dues}</p>
                                    <p>Room</p>
                                    <p>{data.number_of_room}</p>
                                    <p>Front</p>
                                    <p>{getStringOption(formOptions.front, data.front)}</p>
                                    <p>Gross / Net M²</p>
                                    <p>{data.gross_m2} / {data.net_m2}</p>
                                    <p>Warming Type</p>
                                    <p>{getStringOption(formOptions.warmingType, data.warming_type)}</p>
                                    <p>Building Age</p>
                                    <p>{data.building_age}</p>
                                </C.GenInfoGrid>
                            </Fieldset>
                            <Fieldset title="Explanation">
                                <p className="explanation">{data.explanation}</p>
                            </Fieldset>
                            <Fieldset title="House Features">
                                <C.FeaturesContainer>
                                    <div>
                                        <C.TitleFeatures>Interior Features</C.TitleFeatures>
                                        <C.Features>
                                            {data.interior_features.map(feature => {
                                                let word = '';
                                                interiorFeatures.map(arr => {
                                                    if (arr.indexOf(feature) !== -1)
                                                        word = arr[0];
                                                })
                                                return <li key={feature}>{word}</li>
                                            })}
                                        </C.Features>
                                    </div>
                                    <div>
                                        <C.TitleFeatures>External Features</C.TitleFeatures>
                                        <C.Features>
                                            {data.external_features.map(feature => {
                                                let word = '';
                                                externalFeatures.map(arr => {
                                                    if (arr.indexOf(feature) !== -1)
                                                        word = arr[0];
                                                })
                                                return <li key={feature}>{word}</li>
                                            })}
                                        </C.Features>
                                    </div>
                                </C.FeaturesContainer>
                            </Fieldset>
                            {
                                data.latlng ? (
                                    <Fieldset title="Location Information">
                                        <DynamicMap position={data.latlng} />
                                    </Fieldset>
                                ) : null
                            }
                        </C.Content>
                        <C.Owner>
                            <C.OwnerCard>
                                <div>
                                    <div className="user-image">
                                        <Image
                                            layout="fill"
                                            src={data.photo_url ?? defaultUserImage}
                                            alt={data.name}
                                        />
                                    </div>
                                    <p>{data.name}</p>
                                </div>
                                <div>
                                    <C.InfoButton
                                        background="var(--green2)"
                                        color="#fff"
                                        onClick={e => setShowPhone(p => !p)}
                                    >
                                        {showPhone ? (
                                            <p>{data.mobile_number}</p>
                                        ) : (
                                            <>
                                                <Image src={phoneIcon} width={20} height={20} alt="phone icon" />
                                                <p>view phone</p>
                                            </>
                                        )}
                                    </C.InfoButton>
                                    <C.InfoButton
                                        border="var(--dark-blue)"
                                        color="var(--dark-blue)"
                                        background="var(--white)"
                                        onClick={e => copyText(data.email)}
                                    >
                                        <Image src={emailIcon} width={20} height={20} alt="phone icon" />
                                        <p>copy email</p>
                                    </C.InfoButton>
                                </div>
                            </C.OwnerCard>
                        </C.Owner>
                    </C.Container>
                ) : (
                    // not found page goes here
                    <p>not found</p>
                )
            }
            <Footer />
        </>
    )
}

export function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    }
}

export async function getStaticProps({ params }: GetStaticPropsContext<{ id: string }>) {
    const { data, error } = await supabase.from("houses")
        .select()
        .eq("id", params?.id ?? '1')
        .limit(1)
        .single();

    return {
        props: { data }
    }
}