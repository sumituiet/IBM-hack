import { useState, useEffect } from 'react'
import { supabase } from '../../components/supabaseClient'
import { View, Alert, useColorScheme, Text } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { Session } from '@supabase/supabase-js'
import { createStyles } from '../../assets/styles'

export default function Profile(){
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')
    const [website, setWebsite] = useState('')
    const [full_name, setFullName] = useState('')
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const styles = createStyles(isDarkMode);
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
          setSession(session)
        })
    
        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
      }, [])
      
      const updateProfile = async (id:any, newData:any) => {
        try {
          // Attempt to update the profile
          const { data: updateData, error: updateError, count } = await supabase
            .from('profiles') // replace 'profiles' with your table name
            .update(newData)
            .eq('id', id)
            .select(); // Remove `.single()` to avoid expecting only one row
      
          if (updateError) {
            console.error('Error updating profile:', updateError);
          } else if (count === 0 || (updateData && updateData.length === 0)) {
            // If no rows were affected by the update, insert a new row
            const { data: insertData, error: insertError } = await supabase
              .from('profiles')
              .insert([{ id, ...newData }]); // Include the 'id' and new data
      
            if (insertError) {
              console.error('Error inserting new profile:', insertError);
            } else {
              console.log('New profile inserted:', insertData);
            }
          } else {
            console.log('Profile updated:', updateData);
          }
        } catch (error) {
          console.error('Unexpected error updating or inserting profile:', error);
        }
      };
        
    return (<View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        {session && <Text style={styles.text}>{session.user?.email}</Text>}
        <Input
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
        />
        <Input
            placeholder="Full Name"
            value={full_name}
            onChangeText={setFullName}
            style={styles.input}
        />
        <Input
            placeholder="Website"
            value={website}
            onChangeText={setWebsite}
            style={styles.input}
        />

        <Button
            onPress={async () => {
                if (!session) {
                    Alert.alert('You must be logged in to update your profile')
                    return
                }
                setLoading(true)
                await updateProfile(session.user?.id, { username, website,full_name,"email":session.user?.email, updated_at: new Date() })
                setLoading(false)
            }}
            title="Update"
        />
        </View>
    )}