import React, { useContext, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Hyperlink from 'react-native-hyperlink';
import { deleteAuthToken } from '../utils';
import TabBarIcon from '../components/TabBarIcon';
import { NotificationContext } from '../context/Notification';
import ParentScreenHeader from '../components/ParentScreenHeader';
import ChildScreenHeader from '../components/ChildScreenHeader';

const faqs = [
  {
    title: 'What is Coronavirus?',
    content:
      'Coronaviruses are a large family of viruses which may cause illness in animals or humans.  In humans, several coronaviruses are known to cause respiratory infections ranging from the common cold to more severe diseases such as Middle East Respiratory Syndrome (MERS) and Severe Acute Respiratory Syndrome (SARS). The most recently discovered coronavirus causes coronavirus disease COVID-19.',
  },
  {
    title: 'What are the Symptoms of COVID-19 ?',
    content:
      "The most common symptoms of COVID-19 are fever, tiredness, and dry cough. Some patients may have aches and pains, nasal congestion, runny nose, sore throat or diarrhea. These symptoms are usually mild and begin gradually. Some people become infected but don’t develop any symptoms and don't feel unwell. Most people (about 80%) recover from the disease without needing special treatment. Around 1 out of every 6 people who gets COVID-19 becomes seriously ill and develops difficulty breathing. Older people, and those with underlying medical problems like high blood pressure, heart problems or diabetes, are more likely to develop serious illness. People with fever, cough and difficulty breathing should seek medical attention.",
  },
  {
    title: 'How does COVID-19 Spread ?',
    content:
      'People can catch COVID-19 from others who have the virus. The disease can spread from person to person through small droplets from the nose or mouth which are spread when a person with COVID-19 coughs or exhales. These droplets land on objects and surfaces around the person. Other people then catch COVID-19 by touching these objects or surfaces, then touching their eyes, nose or mouth. People can also catch COVID-19 if they breathe in droplets from a person with COVID-19 who coughs out or exhales droplets. This is why it is important to stay more than 1 meter (3 feet) away from a person who is sick. WHO is assessing ongoing research on the ways COVID-19 is spread and will continue to share updated findings.',
  },
  {
    title: 'What can I do to protect myself and prevent the spread of the disease?',
    content:
      'Protection measures for everyone\n' +
      'Stay aware of the latest information on the COVID-19 outbreak, available on the WHO website and through your national and local public health authority. Many countries around the world have seen cases of COVID-19 and several have seen outbreaks. Authorities in China and some other countries have succeeded in slowing or stopping their outbreaks. However, the situation is unpredictable so check regularly for the latest news.\n' +
      '\n' +
      'You can reduce your chances of being infected or spreading COVID-19 by taking some simple precautions:\n' +
      '\n' +
      'Regularly and thoroughly clean your hands with an alcohol-based hand rub or wash them with soap and water.\n' +
      'Why? Washing your hands with soap and water or using alcohol-based hand rub kills viruses that may be on your hands.\n' +
      'Maintain at least 1 metre (3 feet) distance between yourself and anyone who is coughing or sneezing.\n' +
      'Why? When someone coughs or sneezes they spray small liquid droplets from their nose or mouth which may contain virus. If you are too close, you can breathe in the droplets, including the COVID-19 virus if the person coughing has the disease.\n' +
      'Avoid touching eyes, nose and mouth.\n' +
      'Why? Hands touch many surfaces and can pick up viruses. Once contaminated, hands can transfer the virus to your eyes, nose or mouth. From there, the virus can enter your body and can make you sick.\n' +
      'Make sure you, and the people around you, follow good respiratory hygiene. This means covering your mouth and nose with your bent elbow or tissue when you cough or sneeze. Then dispose of the used tissue immediately.\n' +
      'Why? Droplets spread virus. By following good respiratory hygiene you protect the people around you from viruses such as cold, flu and COVID-19.\n' +
      'Stay home if you feel unwell. If you have a fever, cough and difficulty breathing, seek medical attention and call in advance. Follow the directions of your local health authority.\n' +
      'Why? National and local authorities will have the most up to date information on the situation in your area. Calling in advance will allow your health care provider to quickly direct you to the right health facility. This will also protect you and help prevent spread of viruses and other infections.\n' +
      'Keep up to date on the latest COVID-19 hotspots (cities or local areas where COVID-19 is spreading widely). If possible, avoid traveling to places  – especially if you are an older person or have diabetes, heart or lung disease.\n' +
      'Why? You have a higher chance of catching COVID-19 in one of these areas.\n' +
      ' \n' +
      '\n' +
      'Protection measures for persons who are in or have recently visited (past 14 days) areas where COVID-19 is spreading\n' +
      'Follow the guidance outlined above (Protection measures for everyone)\n' +
      'Self-isolate by staying at home if you begin to feel unwell, even with mild symptoms such as headache, low grade fever (37.3 C or above) and slight runny nose, until you recover. If it is essential for you to have someone bring you supplies or to go out, e.g. to buy food, then wear a mask to avoid infecting other people.\n' +
      'Why? Avoiding contact with others and visits to medical facilities will allow these facilities to operate more effectively and help protect you and others from possible COVID-19 and other viruses.\n' +
      'If you develop fever, cough and difficulty breathing, seek medical advice promptly as this may be due to a respiratory infection or other serious condition. Call in advance and tell your provider of any recent travel or contact with travelers.\n' +
      'Why? Calling in advance will allow your health care provider to quickly direct you to the right health facility. This will also help to prevent possible spread of COVID-19 and other viruses.',
  },
  {
    title: 'How likely am I to catch COVID-19?',
    content:
      'The risk depends on where you  are - and more specifically, whether there is a COVID-19 outbreak unfolding there.\n' +
      '\n' +
      'For most people in most locations the risk of catching COVID-19 is still low. However, there are now places around the world (cities or areas) where the disease is spreading. For people living in, or visiting, these areas the risk of catching COVID-19 is higher. Governments and health authorities are taking vigorous action every time a new case of COVID-19 is identified. Be sure to comply with any local restrictions on travel, movement or large gatherings. Cooperating with disease control efforts will reduce your risk of catching or spreading COVID-19.\n' +
      '\n' +
      'COVID-19 outbreaks can be contained and transmission stopped, as has been shown in China and some other countries. Unfortunately, new outbreaks can emerge rapidly. It’s important to be aware of the situation where you are or intend to go. WHO publishes daily updates on the COVID-19 situation worldwide.\n' +
      '\n' +
      'You can see these at https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports/',
  },
  {
    title: 'Should I worry about COVID-19?',
    content:
      'Illness due to COVID-19 infection is generally mild, especially for children and young adults. However, it can cause serious illness: about 1 in every 5 people who catch it need hospital care. It is therefore quite normal for people to worry about how the COVID-19 outbreak will affect them and their loved ones.\n' +
      '\n' +
      'We can channel our concerns into actions to protect ourselves, our loved ones and our communities. First and foremost among these actions is regular and thorough hand-washing and good respiratory hygiene. Secondly, keep informed and follow the advice of the local health authorities including any restrictions put in place on travel, movement and gatherings.\n' +
      'Learn more about how to protect yourself at https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public',
  },
  {
    title: 'Who is at risk of developing severe illness?',
    content:
      'While we are still learning about how COVID-2019 affects people, older persons and persons with pre-existing medical conditions (such as high blood pressure, heart disease, lung disease, cancer or diabetes)  appear to develop serious illness more often than others.',
  },
  {
    title: 'Are antibiotics effective for preventing or treating the COVID-19?',
    content:
      'No. Antibiotics do not work against viruses, they only work on bacterial infections. COVID-19 is caused by a virus, so antibiotics do not work. Antibiotics should not be used as a means of prevention or treatment of COVID-19. They should only be used as directed by a physician to treat a bacterial infection. ',
  },
  {
    title: 'Are there any medicines or therapy that can prevent or cure COVID-19?',
    content:
      'While some western, traditional or home remedies may provide comfort and alleviate symptoms of COVID-19, there is no evidence that current medicine can prevent or cure the disease. WHO does not recommend self-medication with any medicines, including antibiotics, as a prevention or cure for COVID-19. However, there are several ongoing clinical trials that include both western and traditional medicines. WHO will continue to provide updated information as soon as clinical findings are available.',
  },
  {
    title: 'Is there a vaccine, drug or treatment for COVID-19?',
    content:
      'Not yet. To date, there is no vaccine and no specific antiviral medicine to prevent or treat COVID-2019. However, those affected should receive care to relieve symptoms. People with serious illness should be hospitalized. Most patients recover thanks to supportive care.\n' +
      '\n' +
      'Possible vaccines and some specific drug treatments are under investigation. They are being tested through clinical trials. WHO is coordinating efforts to develop vaccines and medicines to prevent and treat COVID-19.\n' +
      '\n' +
      'The most effective ways to protect yourself and others against COVID-19 are to frequently clean your hands, cover your cough with the bend of elbow or tissue, and maintain a distance of at least 1 meter (3 feet) from people who are coughing or sneezing. (See Basic protective measures against the new coronavirus).',
  },
  {
    title: 'Is COVID-19 the same as SARS?',
    content:
      'No. The virus that causes COVID-19 and the one that caused the outbreak of Severe Acute Respiratory Syndrome (SARS) in 2003 are related to each other genetically, but the diseases they cause are quite different.\n' +
      '\n' +
      'SARS was more deadly but much less infectious than COVID-19. There have been no outbreaks of SARS anywhere in the world since 2003.',
  },
  {
    title: 'Should I wear a mask to protect myself?',
    content:
      'Only wear a mask if you are ill with COVID-19 symptoms (especially coughing) or looking after someone who may have COVID-19. Disposable face mask can only be used once. If you are not ill or looking after someone who is ill then you are wasting a mask. There is a world-wide shortage of masks, so WHO urges people to use masks wisely.\n' +
      '\n' +
      'WHO advises rational use of medical masks to avoid unnecessary wastage of precious resources and mis-use of masks  (see Advice on the use of masks).\n' +
      '\n' +
      'The most effective ways to protect yourself and others against COVID-19 are to frequently clean your hands, cover your cough with the bend of elbow or tissue and maintain a distance of at least 1 meter (3 feet) from people who are coughing or sneezing. See basic protective measures against the new coronavirus for more information.',
  },
  {
    title: 'How do I put on, use, take off and dispose of a mask?',
    content:
      'Remember, a mask should only be used by health workers, care takers, and individuals with respiratory symptoms, such as fever and cough.\n' +
      'Before touching the mask, clean hands with an alcohol-based hand rub or soap and water\n' +
      'Take the mask and inspect it for tears or holes.\n' +
      'Orient which side is the top side (where the metal strip is).\n' +
      'Ensure the proper side of the mask faces outwards (the coloured side).\n' +
      'Place the mask to your face. Pinch the metal strip or stiff edge of the mask so it moulds to the shape of your nose.\n' +
      'Pull down the mask’s bottom so it covers your mouth and your chin.\n' +
      'After use, take off the mask; remove the elastic loops from behind the ears while keeping the mask away from your face and clothes, to avoid touching potentially contaminated surfaces of the mask.\n' +
      'Discard the mask in a closed bin immediately after use.\n' +
      'Perform hand hygiene after touching or discarding the mask – Use alcohol-based hand rub or, if visibly soiled, wash your hands with soap and water.',
  },
  {
    title: 'How long is the incubation period for COVID-19?',
    content:
      'The “incubation period” means the time between catching the virus and beginning to have symptoms of the disease. Most estimates of the incubation period for COVID-19 range from 1-14 days, most commonly around five days. These estimates will be updated as more data become available.',
  },
  {
    title: 'Can humans become infected with the COVID-19 from an animal source?',
    content:
      'Coronaviruses are a large family of viruses that are common in animals. Occasionally, people get infected with these viruses which may then spread to other people. For example, SARS-CoV was associated with civet cats and MERS-CoV is transmitted by dromedary camels. Possible animal sources of COVID-19 have not yet been confirmed.  \n' +
      '\n' +
      'To protect yourself, such as when visiting live animal markets, avoid direct contact with animals and surfaces in contact with animals. Ensure good food safety practices at all times. Handle raw meat, milk or animal organs with care to avoid contamination of uncooked foods and avoid consuming raw or undercooked animal products.',
  },
  {
    title: 'Can I catch the COVID-19 from my pet?',
    content:
      'While there has been one instance of a dog being infected in Hong Kong, to date, there is no evidence that a dog, cat or any pet can transmit COVID-19. COVID-19 is mainly spread through droplets produced when an infected person coughs, sneezes, or speaks. To protect yourself, clean your hands frequently and thoroughly. \n' +
      '\n' +
      'WHO continues to monitor the latest research on this and other COVID-19 topics and will update as new findings are available.',
  },
  {
    title: 'How long does the virus survive on surfaces?',
    content:
      'It is not certain how long the virus that causes COVID-19 survives on surfaces, but it seems to behave like other coronaviruses. Studies suggest that coronaviruses (including preliminary information on the COVID-19 virus) may persist on surfaces for a few hours or up to several days. This may vary under different conditions (e.g. type of surface, temperature or humidity of the environment).\n' +
      '\n' +
      'If you think a surface may be infected, clean it with simple disinfectant to kill the virus and protect yourself and others. Clean your hands with an alcohol-based hand rub or wash them with soap and water. Avoid touching your eyes, mouth, or nose.',
  },
  {
    title: 'Is it safe to receive a package from any area where COVID-19 has been repaorted?',
    content:
      'Yes. The likelihood of an infected person contaminating commercial goods is low and the risk of catching the virus that causes COVID-19 from a package that has been moved, travelled, and exposed to different conditions and temperature is also low. ',
  },
  {
    title: 'Is there anything I should not do?',
    content:
      'The following measures ARE NOT effective against COVID-2019 and can be harmful:\n' +
      '\n' +
      'Smoking\n' +
      'Wearing multiple masks\n' +
      'Taking antibiotics (See question 10 "Are there any medicines of therapies that can prevent or cure COVID-19?")\n' +
      'In any case, if you have fever, cough and difficulty breathing seek medical care early to reduce the risk of developing a more severe infection and be sure to share your recent travel history with your health care provider.',
  },
];

const FAQScreen = ({ navigation }) => {
  const [activeSections, setActiveSections] = useState([]);
  const { openNotificationScreen } = useContext(NotificationContext);

  const _renderHeader = (section) => {
    return (
      <View
        style={{
          backgroundColor: '#ffffff',
          justifyContent: 'center',
          paddingHorizontal: 20,
          paddingVertical: 15,
          marginHorizontal: 10,
          marginTop: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ fontFamily: 'bold', fontSize: 16 }}>{section.title}</Text>
      </View>
    );
  };

  const _renderContent = (section) => {
    return (
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Hyperlink linkDefault={true} linkStyle={{ color: 'red' }}>
          <Text style={{ flex: 1, flexWrap: 'wrap', lineHeight: 16, fontFamily: 'regular' }}>
            {section.content}
          </Text>
        </Hyperlink>
      </View>
    );
  };

  const _updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ChildScreenHeader title="FAQ" />
      <View style={{ backgroundColor: 'white', flexDirection: 'row' }}>
        <View style={{ marginTop: 50, paddingHorizontal: 20, marginBottom: 0, flex: 0.9 }}>
          <TouchableOpacity onLongPress={() => deleteAuthToken()}>
            <Text style={{ fontFamily: 'regular' }}>From World Health Organization</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 50, flex: 0.1 }}>
          <TouchableOpacity onPress={openNotificationScreen}>
            <TabBarIcon focused={true} color="#718096" name="ios-notifications" size={27} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20 }}>
        <Hyperlink linkStyle={{ color: 'red' }} linkDefault={true}>
          <Text style={{ fontFamily: 'regular' }}>
            WHO is continuously monitoring and responding to this outbreak. This Q&A will be updated
            as more is known about COVID-19, how it spreads and how it is affecting people
            worldwide. For more information, check back regularly on WHO’s Coronavirus pages.
            https://www.who.int/emergencies/diseases/novel-coronavirus-2019
          </Text>
        </Hyperlink>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: 30 }}>
          <Accordion
            sections={faqs}
            activeSections={activeSections}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={_updateSections}
            underlayColor="transparent"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default FAQScreen;
