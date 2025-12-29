import React from 'react'
import {Card, Stack, Text, Box, Flex, Badge} from '@sanity/ui'
import {getSEOChecklist, getSEORecommendations, calculateReadingTime} from '../utils/seoHelpers'

interface SEOPreviewProps {
  document: {
    displayed: any
  }
}

export function SEOPreview(props: SEOPreviewProps) {
  const {document} = props
  const post = document.displayed

  if (!post) {
    return null
  }

  const title = post.seo?.metaTitle || post.title || 'Untitled'
  const description = post.seo?.metaDescription || post.excerpt || ''
  const url = post.slug?.current ? `islanderstudio.com/blog/${post.slug.current}` : ''

  const readingTime = post.readingTime || (post.body ? calculateReadingTime(post.body) : 0)
  const checklist = getSEOChecklist(post)
  const recommendations = getSEORecommendations(post)

  // Determine badge color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'positive'
    if (score >= 60) return 'caution'
    return 'critical'
  }

  return (
    <Card padding={4} radius={2} shadow={1}>
      <Stack space={4}>
        {/* SEO Score */}
        <Flex justify="space-between" align="center">
          <Text size={2} weight="semibold">
            SEO Score
          </Text>
          <Badge tone={getScoreColor(checklist.score)} fontSize={2} padding={2}>
            {checklist.score}%
          </Badge>
        </Flex>

        {/* Google Search Preview */}
        <Box>
          <Text size={1} weight="semibold" style={{marginBottom: '8px'}}>
            Google Search Preview
          </Text>
          <Card padding={3} radius={2} shadow={1} style={{backgroundColor: '#fff'}}>
            <Stack space={2}>
              <Text
                size={1}
                style={{
                  color: '#1a0dab',
                  fontSize: '20px',
                  lineHeight: '1.3',
                  fontFamily: 'arial, sans-serif',
                }}
              >
                {title.length > 60 ? title.substring(0, 57) + '...' : title}
              </Text>
              <Text
                size={1}
                style={{
                  color: '#006621',
                  fontSize: '14px',
                  fontFamily: 'arial, sans-serif',
                }}
              >
                {url}
              </Text>
              <Text
                size={1}
                style={{
                  color: '#545454',
                  fontSize: '14px',
                  lineHeight: '1.58',
                  fontFamily: 'arial, sans-serif',
                }}
              >
                {description.length > 160 ? description.substring(0, 157) + '...' : description}
              </Text>
            </Stack>
          </Card>
        </Box>

        {/* Reading Time */}
        {readingTime > 0 && (
          <Flex justify="space-between" align="center">
            <Text size={1}>Reading Time</Text>
            <Text size={1} weight="semibold">
              {readingTime} min
            </Text>
          </Flex>
        )}

        {/* Character Counts */}
        <Stack space={2}>
          <Flex justify="space-between" align="center">
            <Text size={1}>Title Length</Text>
            <Text
              size={1}
              weight="semibold"
              style={{color: title.length <= 60 ? '#43A047' : '#F57C00'}}
            >
              {title.length}/60
            </Text>
          </Flex>
          <Flex justify="space-between" align="center">
            <Text size={1}>Description Length</Text>
            <Text
              size={1}
              weight="semibold"
              style={{color: description.length <= 160 ? '#43A047' : '#F57C00'}}
            >
              {description.length}/160
            </Text>
          </Flex>
        </Stack>

        {/* SEO Checklist */}
        <Box>
          <Text size={1} weight="semibold" style={{marginBottom: '8px'}}>
            SEO Checklist ({checklist.passedChecks}/{checklist.totalChecks})
          </Text>
          <Stack space={2}>
            <ChecklistItem checked={checklist.checks.hasTitle} label="Has title" />
            <ChecklistItem
              checked={checklist.checks.hasTitleOptimalLength}
              label="Title is 30-60 characters"
            />
            <ChecklistItem checked={checklist.checks.hasExcerpt} label="Has excerpt" />
            <ChecklistItem
              checked={checklist.checks.hasMetaDescription}
              label="Has meta description"
            />
            <ChecklistItem
              checked={checklist.checks.hasFocusKeyword}
              label="Has focus keyword"
            />
            <ChecklistItem checked={checklist.checks.hasMainImage} label="Has featured image" />
            <ChecklistItem
              checked={checklist.checks.hasMainImageAlt}
              label="Featured image has alt text"
            />
            <ChecklistItem checked={checklist.checks.hasCategories} label="Has categories" />
          </Stack>
        </Box>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <Box>
            <Text size={1} weight="semibold" style={{marginBottom: '8px'}}>
              Recommendations
            </Text>
            <Card padding={3} radius={2} tone="caution">
              <Stack space={2}>
                {recommendations.map((rec, index) => (
                  <Text key={index} size={1}>
                    • {rec}
                  </Text>
                ))}
              </Stack>
            </Card>
          </Box>
        )}
      </Stack>
    </Card>
  )
}

function ChecklistItem({checked, label}: {checked: boolean; label: string}) {
  return (
    <Flex align="center" gap={2}>
      <Text size={1} style={{color: checked ? '#43A047' : '#9E9E9E'}}>
        {checked ? '✓' : '○'}
      </Text>
      <Text size={1} style={{color: checked ? '#000' : '#9E9E9E'}}>
        {label}
      </Text>
    </Flex>
  )
}
