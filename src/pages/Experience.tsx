// @ts-ignore
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export default function Experience() {
    return (
        <section className="py-12 bg-neutral-900 text-white text-center">
            <h2 className="text-4xl font-bold mb-6">Experience</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                        date="2024 - present"
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    >
                        <h3 className="vertical-timeline-element-title">Software Engineer 2</h3>
                        <h4 className="vertical-timeline-element-subtitle">Cvent Inc.</h4>
                        <p>
                            Working on AI projects... Can't say much more than that.
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="2022 - 2024"
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    >
                        <h3 className="vertical-timeline-element-title">Software Engineer</h3>
                        <h4 className="vertical-timeline-element-subtitle">Cvent Inc.</h4>
                        <p>
                            Worked on the Sessions and Speakers product, streamlined the cache reset process for lookups, and worked on multi language
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="2018 - 2022"
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    >
                        <h3 className="vertical-timeline-element-title">Student at Sewanee</h3>
                        <h4 className="vertical-timeline-element-subtitle">Sewanee: The University of the South</h4>
                        <p>
                            Studied Computer Science and Russian
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </p>
        </section>
    );
}