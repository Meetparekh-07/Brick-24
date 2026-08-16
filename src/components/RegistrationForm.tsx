import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, AlertCircle } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface TeamMember {
  id: string
  name: string
  email: string
}

interface FormErrors {
  teamName?: string
  collegeName?: string
  members?: {
    [key: string]: {
      name?: string
      email?: string
    }
  }
}

interface RegistrationFormProps {
  onSubmit: (data: {
    teamName: string
    collegeName: string
    members: TeamMember[]
  }) => Promise<void>
  isLoading?: boolean
}

export function RegistrationForm({ onSubmit, isLoading = false }: RegistrationFormProps) {
  const reducedMotion = useReducedMotion()
  const [teamName, setTeamName] = useState('')
  const [collegeName, setCollegeName] = useState('')
  const [members, setMembers] = useState<TeamMember[]>([
    { id: '1', name: '', email: '' },
  ])
  const [errors, setErrors] = useState<FormErrors>({})

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!teamName.trim()) {
      newErrors.teamName = 'Team name is required.'
    }

    if (!collegeName.trim()) {
      newErrors.collegeName = 'College name is required.'
    }

    if (members.length === 0) {
      newErrors.members = { '0': { name: 'At least one team member is required.' } }
    } else {
      const memberErrors: {
        [key: string]: {
          name?: string
          email?: string
        }
      } = {}
      members.forEach((member, index) => {
        const errors: { name?: string; email?: string } = {}
        if (!member.name.trim()) {
          errors.name = 'Member name is required.'
        }
        if (!member.email.trim()) {
          errors.email = 'Email is required.'
        } else if (!validateEmail(member.email)) {
          errors.email = 'Please enter a valid email address.'
        }
        if (Object.keys(errors).length > 0) {
          memberErrors[index] = errors
        }
      })
      if (Object.keys(memberErrors).length > 0) {
        newErrors.members = memberErrors
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddMember = () => {
    if (members.length < 4) {
      setMembers([...members, { id: Date.now().toString(), name: '', email: '' }])
    }
  }

  const handleRemoveMember = (id: string) => {
    if (members.length > 1) {
      setMembers(members.filter((m) => m.id !== id))
      // Clear errors for removed member
      const newErrors = { ...errors }
      if (newErrors.members) {
        delete newErrors.members[members.findIndex((m) => m.id === id)]
      }
      setErrors(newErrors)
    }
  }

  const handleMemberChange = (id: string, field: 'name' | 'email', value: string) => {
    setMembers(members.map((m) => (m.id === id ? { ...m, [field]: value } : m)))
    // Clear error for this field
    if (errors.members) {
      const memberIndex = members.findIndex((m) => m.id === id)
      if (errors.members[memberIndex]) {
        const newErrors = { ...errors.members[memberIndex] }
        delete newErrors[field]
        if (Object.keys(newErrors).length === 0) {
          const updatedMemberErrors = { ...errors.members }
          delete updatedMemberErrors[memberIndex]
          setErrors({ ...errors, members: updatedMemberErrors })
        } else {
          const updatedMemberErrors = { ...errors.members }
          updatedMemberErrors[memberIndex] = newErrors
          setErrors({ ...errors, members: updatedMemberErrors })
        }
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      await onSubmit({
        teamName,
        collegeName,
        members,
      })
    } catch (error) {
      console.error('Submission error:', error)
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Team Information Section */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="mb-6 font-display text-lg font-bold uppercase tracking-wide text-dark">
          Team Information
        </h3>

        <div className="space-y-5">
          {/* Team Name */}
          <div>
            <label htmlFor="teamName" className="block font-display text-sm font-semibold uppercase tracking-wide text-dark mb-2">
              Team Name
            </label>
            <input
              id="teamName"
              type="text"
              value={teamName}
              onChange={(e) => {
                setTeamName(e.target.value)
                if (errors.teamName) {
                  setErrors({ ...errors, teamName: undefined })
                }
              }}
              placeholder="Enter your team name"
              className={`w-full rounded-lg border-2 px-4 py-3 font-body transition-colors focus:outline-none focus:ring-2 focus:ring-lego-red ${
                errors.teamName ? 'border-lego-red bg-lego-red/5' : 'border-dark hover:border-lego-red'
              }`}
              disabled={isLoading}
            />
            {errors.teamName && (
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 flex items-center gap-2 text-lego-red"
              >
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">{errors.teamName}</span>
              </motion.div>
            )}
          </div>

          {/* College Name */}
          <div>
            <label htmlFor="collegeName" className="block font-display text-sm font-semibold uppercase tracking-wide text-dark mb-2">
              College Name
            </label>
            <input
              id="collegeName"
              type="text"
              value={collegeName}
              onChange={(e) => {
                setCollegeName(e.target.value)
                if (errors.collegeName) {
                  setErrors({ ...errors, collegeName: undefined })
                }
              }}
              placeholder="Enter your college name"
              className={`w-full rounded-lg border-2 px-4 py-3 font-body transition-colors focus:outline-none focus:ring-2 focus:ring-lego-red ${
                errors.collegeName ? 'border-lego-red bg-lego-red/5' : 'border-dark hover:border-lego-red'
              }`}
              disabled={isLoading}
            />
            {errors.collegeName && (
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 flex items-center gap-2 text-lego-red"
              >
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">{errors.collegeName}</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Team Members Section */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="mb-6 font-display text-lg font-bold uppercase tracking-wide text-dark">
          Team Members ({members.length}/4)
        </h3>

        <div className="space-y-6">
          {members.map((member, index) => {
            const memberErrors = errors.members?.[index]
            return (
              <motion.div
                key={member.id}
                custom={index}
                variants={fadeInUp}
                initial={reducedMotion ? false : 'hidden'}
                animate="visible"
                className="rounded-lg border-2 border-dark bg-white p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-display text-sm font-bold uppercase tracking-wide text-dark">
                    Member {index + 1}
                  </h4>
                  {members.length > 1 && index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(member.id)}
                      disabled={isLoading}
                      className="rounded-lg bg-lego-red/10 p-2 text-lego-red hover:bg-lego-red/20 transition-colors disabled:opacity-50"
                      aria-label="Remove member"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Member Name */}
                  <div>
                    <label htmlFor={`member-name-${member.id}`} className="block font-display text-xs font-semibold uppercase tracking-wide text-dark mb-1">
                      Name
                    </label>
                    <input
                      id={`member-name-${member.id}`}
                      type="text"
                      value={member.name}
                      onChange={(e) => handleMemberChange(member.id, 'name', e.target.value)}
                      placeholder="Enter member name"
                      className={`w-full rounded-lg border-2 px-3 py-2 text-sm font-body transition-colors focus:outline-none focus:ring-2 focus:ring-lego-red ${
                        memberErrors?.name
                          ? 'border-lego-red bg-lego-red/5'
                          : 'border-dark hover:border-lego-red'
                      }`}
                      disabled={isLoading}
                    />
                    {memberErrors?.name && (
                      <motion.p
                        initial={reducedMotion ? false : { opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-xs text-lego-red font-medium"
                      >
                        {memberErrors.name}
                      </motion.p>
                    )}
                  </div>

                  {/* Member Email */}
                  <div>
                    <label htmlFor={`member-email-${member.id}`} className="block font-display text-xs font-semibold uppercase tracking-wide text-dark mb-1">
                      Email
                    </label>
                    <input
                      id={`member-email-${member.id}`}
                      type="email"
                      value={member.email}
                      onChange={(e) => handleMemberChange(member.id, 'email', e.target.value)}
                      placeholder="Enter email address"
                      className={`w-full rounded-lg border-2 px-3 py-2 text-sm font-body transition-colors focus:outline-none focus:ring-2 focus:ring-lego-red ${
                        memberErrors?.email
                          ? 'border-lego-red bg-lego-red/5'
                          : 'border-dark hover:border-lego-red'
                      }`}
                      disabled={isLoading}
                    />
                    {memberErrors?.email && (
                      <motion.p
                        initial={reducedMotion ? false : { opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-xs text-lego-red font-medium"
                      >
                        {memberErrors.email}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Add Member Button */}
        {members.length < 4 && (
          <motion.button
            type="button"
            onClick={handleAddMember}
            disabled={isLoading}
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-center gap-2 rounded-lg border-2 border-dashed border-lego-blue bg-lego-blue/5 px-4 py-3 font-display text-sm font-bold uppercase tracking-wide text-lego-blue hover:bg-lego-blue/10 transition-colors disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            Add Team Member
          </motion.button>
        )}
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full rounded-lg border-2 border-dark bg-lego-red px-6 py-4 font-display text-base font-bold uppercase tracking-wide text-white shadow-brick transition-all hover:bg-[#c9000a] hover:shadow-brick-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-lego-red focus:ring-offset-2"
      >
        {isLoading ? 'REGISTERING...' : 'REGISTER TEAM →'}
      </motion.button>
    </form>
  )
}
